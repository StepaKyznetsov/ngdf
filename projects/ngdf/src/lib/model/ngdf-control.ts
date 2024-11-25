import { signal, untracked } from '@angular/core';
import {
  AbstractControl,
  ControlEvent,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import {
  HiddenChangeEvent,
  ValidatorsChangeEvent,
} from '../ngdf-control-events';
import {
  NgdfAbstractControl,
  NgdfFormArray,
  NgdfFormControl,
  NgdfFormGroup,
} from '../types/controls';
import {
  CrossControlDependency,
  WithDependencies,
  WithEvents,
} from '../types/dependencies';
import { findControlInFormGroup } from '../utils/find-control';

type Constructor<T = any, U = any[]> = new (
  ...args: U extends any[]
    ? U
    : U extends Constructor
      ? ConstructorParameters<U>
      : never
) => T;

export function ngdfControl<T = any>(
  baseControl: Constructor<FormControl<T>>,
): Constructor<NgdfFormControl<T>, typeof FormControl<T>>;

export function ngdfControl<T extends NgdfAbstractControl = any>(
  baseControl: Constructor<FormArray<T>>,
): Constructor<NgdfFormArray<T>, typeof FormArray<T>>;

export function ngdfControl<
  T extends {
    [K in keyof T]: NgdfAbstractControl;
  } = any,
>(
  baseControl: Constructor<FormGroup<T>>,
): Constructor<NgdfFormGroup<T>, typeof FormGroup<T>>;

export function ngdfControl<T extends AbstractControl>(
  baseControl: Constructor<T>,
): Constructor<NgdfAbstractControl, T> {
  //@ts-expect-error abstract methods already implemented
  return class NgdfControl
    extends baseControl
    implements WithDependencies, WithEvents
  {
    private readonly _ngdfEvents = new Subject<ControlEvent>();
    _dependentControls: Map<CrossControlDependency, AbstractControl> | null =
      null;

    readonly ngdfEvents: Observable<ControlEvent> = merge(
      this.events,
      this._ngdfEvents.asObservable(),
    );

    get hidden(): boolean {
      return untracked(this.hiddenReactive);
    }

    setHidden(hidden: boolean, opts?: { sourceControl?: AbstractControl }) {
      untracked(() => this.hiddenReactive.set(hidden));
      this._ngdfEvents.next(
        new HiddenChangeEvent(hidden, opts?.sourceControl ?? this),
      );
    }

    private readonly hiddenReactive = signal<boolean>(false);

    override addValidators(
      validators: ValidatorFn | ValidatorFn[],
      opts?: { sourceControl?: AbstractControl },
    ): void {
      super.addValidators(validators);
      this._ngdfEvents.next(
        new ValidatorsChangeEvent(validators, opts?.sourceControl ?? this),
      );
    }

    override removeValidators(
      validators: ValidatorFn | ValidatorFn[],
      opts?: { sourceControl?: AbstractControl },
    ): void {
      super.removeValidators(validators);
      this._ngdfEvents.next(
        new ValidatorsChangeEvent(validators, opts?.sourceControl ?? this),
      );
    }

    setDependentControls(
      formGroup: FormGroup,
      dependencies: CrossControlDependency[],
    ): void {
      (this._dependentControls ??= new Map()).clear();
      dependencies.forEach((dependency) => {
        const {
          control: { key },
        } = dependency;
        const control = findControlInFormGroup(key, formGroup);
        if (control) {
          this._dependentControls!.set(dependency, control);
        }
      });
    }

    getDependentControls(): typeof this._dependentControls {
      return this._dependentControls;
    }

    clearDependentControls(): void {
      this._dependentControls = null;
    }
  };
}

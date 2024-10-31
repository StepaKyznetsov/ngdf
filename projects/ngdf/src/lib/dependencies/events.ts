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
  CrossControlDependency,
  NgdfAbstractControl,
  NgdfFormArray,
  NgdfFormControl,
  NgdfFormGroup,
  WithDependencies,
  WithEvents,
} from '../types';
import { findControlInFormGroup } from '../utils';

/**
 * Event fired when the control's hidden changes.
 */
export class HiddenChangeEvent extends ControlEvent<boolean> {
  constructor(
    public readonly hidden: boolean,
    public readonly source: AbstractControl,
  ) {
    super();
  }
}

/**
 * Event fired when the control's validators changes.
 */
export class ValidatorsChangeEvent extends ControlEvent<
  ValidatorFn | ValidatorFn[]
> {
  constructor(
    public readonly validators: ValidatorFn | ValidatorFn[],
    public readonly source: AbstractControl,
  ) {
    super();
  }
}

export function ngdfControl<T = any>(
  BaseControl: new (...args: any[]) => FormControl<T>,
): NgdfFormControl<T>;

export function ngdfControl<T extends NgdfAbstractControl = any>(
  BaseControl: new (...args: any[]) => FormArray<T>,
): NgdfFormArray<T>;

export function ngdfControl<T extends {
  [K in keyof T]: NgdfAbstractControl;
} = any>(
  BaseControl: new (...args: any[]) => FormGroup<T>,
): NgdfFormGroup<T>;

export function ngdfControl<T extends AbstractControl>(
  BaseControl: new (...args: any[]) => T,
): NgdfAbstractControl {
  //@ts-expect-error abstract methods already implemented
  return class extends BaseControl implements WithDependencies, WithEvents {
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
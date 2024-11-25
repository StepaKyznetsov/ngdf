import { signal, untracked } from '@angular/core';
import {
  AbstractControl,
  ControlEvent,
  FormArray,
  FormControl,
  FormGroup,
  FormResetEvent,
  FormSubmittedEvent,
  PristineChangeEvent,
  StatusChangeEvent,
  TouchedChangeEvent,
  ValidatorFn,
  ValueChangeEvent,
} from '@angular/forms';
import { merge, Observable, Subject, takeUntil, tap } from 'rxjs';
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
  NgdfEventHandlerFn,
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
    private readonly _stopEventWatching = new Subject<void>();

    private _dependentControls: Map<
      CrossControlDependency,
      AbstractControl
    > | null = null;

    readonly ngdfEvents: Observable<ControlEvent> = merge(
      this.events,
      this._ngdfEvents.asObservable(),
    );

    enableEventWatching(): void {
      this.ngdfEvents
        .pipe(tap(onEvent), takeUntil(this._stopEventWatching))
        .subscribe();
    }

    disableEventWatching(): void {
      this._stopEventWatching.next();
      this._stopEventWatching.complete();
    }

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

    override setValidators(
      validators: ValidatorFn | ValidatorFn[] | null,
      opts?: { sourceControl?: AbstractControl },
    ): void {
      super.setValidators(validators);
      this._ngdfEvents.next(
        new ValidatorsChangeEvent(validators, opts?.sourceControl ?? this),
      );
    }

    override addValidators(
      validators: ValidatorFn | ValidatorFn[],
      opts?: { sourceControl?: AbstractControl },
    ): void {
      super.addValidators(validators);
      this._ngdfEvents.next(
        new ValidatorsChangeEvent(validators, opts?.sourceControl ?? this),
      );
    }

    override clearValidators(opts?: { sourceControl?: AbstractControl }): void {
      super.clearValidators();
      this._ngdfEvents.next(
        new ValidatorsChangeEvent(null, opts?.sourceControl ?? this),
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

const valueChangeEventHandlerFn: NgdfEventHandlerFn<ValueChangeEvent<any>> = (
  event,
) => {
  console.log(event);
};
const statusChangeEventHandlerFn: NgdfEventHandlerFn<StatusChangeEvent> = (
  event,
) => {
  console.log(event);
};
const touchedChangeEventHandlerFn: NgdfEventHandlerFn<TouchedChangeEvent> = (
  event,
) => {
  console.log(event);
};
const hiddenChangeEventHandlerFn: NgdfEventHandlerFn<HiddenChangeEvent> = (
  event,
) => {
  console.log(event);
};
const validatorsChangeEventHandlerFn: NgdfEventHandlerFn<
  ValidatorsChangeEvent
> = (event) => {
  console.log(event);
};
const formResetEventHandlerFn: NgdfEventHandlerFn<FormResetEvent> = (event) => {
  console.log(event);
};
const formSubmittedEventHandlerFn: NgdfEventHandlerFn<FormSubmittedEvent> = (
  event,
) => {
  console.log(event);
};
const pristineChangeEventHandlerFn: NgdfEventHandlerFn<PristineChangeEvent> = (
  event,
) => {
  console.log(event);
};

function onEvent(event: ControlEvent): void {
  if (event instanceof ValueChangeEvent) {
    valueChangeEventHandlerFn(event);
  } else if (event instanceof StatusChangeEvent) {
    statusChangeEventHandlerFn(event);
  } else if (event instanceof TouchedChangeEvent) {
    touchedChangeEventHandlerFn(event);
  } else if (event instanceof HiddenChangeEvent) {
    hiddenChangeEventHandlerFn(event);
  } else if (event instanceof ValidatorsChangeEvent) {
    validatorsChangeEventHandlerFn(event);
  } else if (event instanceof FormResetEvent) {
    formResetEventHandlerFn(event);
  } else if (event instanceof FormSubmittedEvent) {
    formSubmittedEventHandlerFn(event);
  } else if (event instanceof PristineChangeEvent) {
    pristineChangeEventHandlerFn(event);
  }

  return;
}

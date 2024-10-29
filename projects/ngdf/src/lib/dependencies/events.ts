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

const a = (Control: new (...args: any[]) => FormControl | FormGroup | FormArray) => {
    return class extends Control {

    }
}
export class NgdfControl extends FormControl {
  private readonly _ngdfEvents = new Subject<ControlEvent>();

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
}

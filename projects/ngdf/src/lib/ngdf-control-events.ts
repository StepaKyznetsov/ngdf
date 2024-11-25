import { AbstractControl, ControlEvent, ValidatorFn } from '@angular/forms';

/**
 * Event fired when the control's hidden property changes.
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
    public readonly validators: ValidatorFn | ValidatorFn[] | null,
    public readonly source: AbstractControl,
  ) {
    super();
  }
}

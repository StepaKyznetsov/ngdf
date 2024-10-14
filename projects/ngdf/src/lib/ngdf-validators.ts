import { ValidatorFn, Validators } from '@angular/forms';
import { NgdfValidatorValue, ValidatorKey } from './model/config';
import { isValidatorKeyWithFnArgument } from './utils';

export class NgdfValidators extends Validators {
  static returnValidatorFn<T extends ValidatorKey>(
    key: T,
    value?: NgdfValidatorValue<T>,
  ): ValidatorFn {
    if (isValidatorKeyWithFnArgument(key) && value) {
      //   return this[key](value);
    } else {
      //   return this[key];
    }

    return this['required'];
  }
}

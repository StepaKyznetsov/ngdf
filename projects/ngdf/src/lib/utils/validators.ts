import { ValidatorFn, Validators } from '@angular/forms';
import {
  NgdfValidators,
  NgdfValidatorValue,
  ValidatorFnWrapper,
  ValidatorKey,
} from '../model/config';
import {
  isBoolean,
  isDefined,
  isObject,
  isRegExp,
  isTruthy,
  isValidatorKeyWithFnArgument,
} from './type-narrowing';

export const wrapValidatorsWithCustomData = (
  validators: NgdfValidators,
): ValidatorFn[] =>
  (
    Object.entries(validators) as [
      ValidatorKey,
      NgdfValidatorValue<ValidatorKey>,
    ][]
  )
    .map(([key, validatorBody]) => {
      if (isObject(validatorBody) && !isRegExp(validatorBody)) {
        if (
          isValidatorKeyWithFnArgument(key) &&
          isDefined(validatorBody.value) &&
          !isBoolean(validatorBody.value)
        ) {
          return (Validators[key] as ValidatorFnWrapper)(validatorBody.value);
        }
        if (!isValidatorKeyWithFnArgument(key)) {
          return Validators[key];
        }
      } else if (
        !isValidatorKeyWithFnArgument(key) &&
        isBoolean(validatorBody)
      ) {
        return Validators[key];
      } else if (
        isValidatorKeyWithFnArgument(key) &&
        !isBoolean(validatorBody)
      ) {
        return (Validators[key] as ValidatorFnWrapper)(validatorBody);
      }

      return null;
    })
    .filter(isTruthy);

import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import {
    NgdfControlConfig,
    NgdfFormArrayConfig,
    NgdfFormControlConfig,
    NgdfFormGroupConfig,
    NgdfValidator,
    ValidatorArgumentTypeByKey,
    ValidatorKey,
    ValidatorKeyWithFnArgument,
} from './model/config';

export const findControlInFormGroupConfig = (
  key: string,
  formGroup: NgdfFormGroupConfig,
  recursive?: boolean,
): NgdfControlConfig | undefined => {
  const control = formGroup.controls[key];

  if (recursive && !control) {
    for (const controlItem of Object.values(formGroup.controls)) {
      if (isFormGroupConfig(controlItem)) {
        const nestedControl = findControlInFormGroupConfig(
          key,
          controlItem,
          recursive,
        );
        if (nestedControl) {
          return nestedControl;
        }
      }
    }
  }

  return control;
};

export const isFormControlConfig = (
  config: NgdfControlConfig,
): config is NgdfFormControlConfig => !('controls' in config);

export const isFormArrayConfig = (
  config: NgdfControlConfig,
): config is NgdfFormArrayConfig =>
  'controls' in config && Array.isArray(config.controls);

export const isFormGroupConfig = (
  config: NgdfControlConfig,
): config is NgdfFormGroupConfig =>
  'controls' in config && !Array.isArray(config.controls);

export const isValidatorKeyWithFnArgument = (
  key: ValidatorKey,
): key is ValidatorKeyWithFnArgument => {
  const validatorsWithArgument: ValidatorKey[] = [
    'min',
    'max',
    'minLength',
    'maxLength',
    'pattern',
  ];

  return validatorsWithArgument.includes(key);
};

export const valueExist = (value: unknown): boolean =>
  value !== undefined && value !== null;

export const wrapValidatorWithCustomErrorText = (
  validator: NgdfValidator,
): ValidatorFn | null => {
  const { key, value, errorText } = validator;
  const validatorFn = createValidatorFn(key, value);
  if (!errorText || !validatorFn) {
    return validatorFn;
  }

  return (control: AbstractControl): ValidationErrors | null => {
    const error: ValidationErrors | null = validatorFn(control);

    return error ? { [key]: errorText } : null;
  };
};

export const createValidatorFn = (
  key: ValidatorKey,
  value?: ValidatorArgumentTypeByKey<typeof key>,
): ValidatorFn | null => {
  if (isValidatorKeyWithFnArgument(key)) {
    if (!valueExist(value)) {
      return null;
    }

    return Validators[key](value as ValidatorArgumentTypeByKey<typeof key>);
  } else {
    if (value === false) {
      return null;
    }

    return Validators[key];
  }
};

import {
  NgdfControlConfig,
  NgdfFormArrayConfig,
  NgdfFormControlConfig,
  NgdfFormGroupConfig,
  NgdfValidators,
  NgdfValidatorValue,
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

export const isObject = (value: unknown): value is object =>
  typeof value === 'object';

export const isRegExp = (value: unknown): value is RegExp =>
  value instanceof RegExp;

export const valueExist = (value: unknown): boolean =>
  value !== undefined && value !== null;

export const wrapValidatorsWithCustomData = (
  validators: NgdfValidators,
): void => {
  (
    Object.entries(validators) as [
      ValidatorKey,
      NgdfValidatorValue<ValidatorKey>,
    ][]
  )
    .map(() => {
      // if (isObject(value) && !isRegExp(value)) {
      //   if (isValidatorKeyWithFnArgument(key) && value.value && typeof value.value !== 'boolean') {
      //     // TODO: fix typing
      //     return Validators[key](value.value);
      //   } else if (typeof value.value !== 'boolean') {
      //     return Validators[key];
      //   }
      // } else {
      //   if (typeof value === 'boolean') {
      //     return Validators[key];
      //   } else if (isValidatorKeyWithFnArgument(key)) {
      //     const a = Validators[key];
      //     return Validators[key](value);
      //   }
      // }

      return null;
    })
    .filter((v) => !!v);
  // const validatorFn = createValidatorFn(validator);
  // if (!errorText || !validatorFn) {
  //   return validatorFn;
  // }

  // return (control: AbstractControl): ValidationErrors | null => {
  //   const error: ValidationErrors | null = validatorFn(control);

  //   return error ? { [key]: errorText } : null;
  // };
};

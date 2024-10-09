import {
    ControlValidatorKey,
    ControlValidatorKeyWithFnArgument,
    NgdfControlConfig,
    NgdfFormArrayConfig,
    NgdfFormControlConfig,
    NgdfFormGroupConfig,
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
  key: ControlValidatorKey,
): key is ControlValidatorKeyWithFnArgument => {
  const validatorsWithArgument: ControlValidatorKey[] = [
    'min',
    'max',
    'minLength',
    'maxLength',
    'pattern',
  ];

  return validatorsWithArgument.includes(key);
};

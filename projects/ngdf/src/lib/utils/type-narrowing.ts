import {
  NgdfControl,
  NgdfFormArrayConfig,
  NgdfFormControlConfig,
  NgdfFormGroupConfig,
  ValidatorKey,
  ValidatorKeyWithWrapperFn,
} from '../types';

/**
 * Whether the value is of type NgdfFormControlConfig
 */
export const isFormControlConfig = (
  config: NgdfControl,
): config is NgdfFormControlConfig => !('controls' in config);

/**
 * Whether the value is of type NgdfFormArrayConfig
 */
export const isFormArrayConfig = (
  config: NgdfControl,
): config is NgdfFormArrayConfig =>
  'controls' in config && Array.isArray(config.controls);

/**
 * Whether the value is of type NgdfFormGroupConfig
 */
export const isFormGroupConfig = (
  config: NgdfControl,
): config is NgdfFormGroupConfig =>
  'controls' in config && !Array.isArray(config.controls);

/**
 * Whether the value is of type ValidatorKeyWithWrapperFn
 * ('max' | 'min' | 'pattern' | 'maxLength' | 'minLength')
 */
export const isValidatorKeyWithWrapperFn = (
  key: ValidatorKey,
): key is ValidatorKeyWithWrapperFn => {
  const validatorsWithArgument: ValidatorKey[] = [
    'min',
    'max',
    'minLength',
    'maxLength',
    'pattern',
  ];

  return validatorsWithArgument.includes(key);
};

/**
 * Whether the value is non primitive
 */
export const isObject = (value: unknown): value is object =>
  typeof value === 'object';

/**
 * Whether the value is RegExp
 */
export const isRegExp = (value: unknown): value is RegExp =>
  value instanceof RegExp;

/**
 * Whether the value is of type boolean
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

/**
 * Whether the value is of type {@link NonNullable}
 */
export const isNonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

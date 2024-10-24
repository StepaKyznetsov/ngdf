import {
  NgdfAbstractControlConfig,
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
  config: NgdfAbstractControlConfig,
): config is NgdfFormControlConfig => !('controls' in config);

/**
 * Whether the value is of type NgdfFormArrayConfig
 */
export const isFormArrayConfig = (
  config: NgdfAbstractControlConfig,
): config is NgdfFormArrayConfig =>
  'controls' in config && Array.isArray(config.controls);

/**
 * Whether the value is of type NgdfFormGroupConfig
 */
export const isFormGroupConfig = (
  config: NgdfAbstractControlConfig,
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
 * Whether the value is of type {@link Truthy}
 */
export const isNonNullable = <T>(x: T): x is NonNullable<T> =>
  x !== null && x !== undefined;

/**
 * Whether the value is of type {@link NonNullable}
 */
export const isDefined = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;

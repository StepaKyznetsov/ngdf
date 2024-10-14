import { ValidatorFn, Validators } from '@angular/forms';

type NgdfCompositeType = 'group' | 'array';

/**
 * A basic set that will be expanded over time
 */
export type NgdfControlType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'toggle'
  | 'autocomplete'
  | 'checkbox'
  | 'radio'
  | NgdfCompositeType;

/**
 * Keys of configurable synchronous validators
 *
 * @note clearer and easier-to-use way to get the name of validators
 * instead of using inheritance and exclusion keys in the {@link Validators} class
 */
export type ValidatorKey =
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'required'
  | 'requiredTrue'
  | 'email'
  | 'nullValidator';

/**
 * Validator keys ...
 */
export type ValidatorKeyWithFnArgument = Exclude<
  ValidatorKey,
  'required' | 'requiredTrue' | 'nullValidator' | 'email'
>;

/**
 * Argument types for Validators keys from {@link ValidatorKey}
 */
export type ValidatorArgumentTypeByKey<T extends ValidatorKey> =
  T extends ValidatorKeyWithFnArgument
    ? (typeof Validators)[T] extends (_: infer R) => ValidatorFn
      ? R extends unknown[]
        ? never
        : R
      : never
    : boolean;

export interface NgdfValidatorBody<T extends ValidatorKey> {
  value?: ValidatorArgumentTypeByKey<T>;
  errorText?: string;
}

export type ValidatorArgument<T extends keyof typeof Validators> =
  T extends 'pattern'
    ? RegExp | string
    : T extends 'max'
      ? number
      : T extends 'min'
        ? number
        : T extends 'minLength'
          ? number
          : T extends 'maxLength'
            ? number
            : boolean;

export type NgdfValidatorValue<T extends ValidatorKey> =
  | NgdfValidatorBody<T>
  | ValidatorArgumentTypeByKey<T>;

export type NgdfValidators = {
  [key in ValidatorKey]?: NgdfValidatorValue<key>;
};

export type EntryTuple<T extends object> = {
  [key in keyof T]: [key, Exclude<T[key], string>];
}[keyof T];

/**
 * Base type for all dynamic controls / arrays / groups
 */
export interface NgdfAbstractControlConfig {
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  label?: string;
  validators?: NgdfValidators;
  // asyncValidators?: NgdfAsyncValidators;
  type: NgdfControlType;
}

/**
 * Control / form field
 */
export interface NgdfFormControlConfig<T = string>
  extends NgdfAbstractControlConfig {
  options?: Option[];
  placeholder?: string;
  value: T;
}

/**
 * Select/autocomplete/radio/toggle options
 */
export interface Option<T extends string | number = string> {
  label: string;
  value: T | null;
}

type CompositeControlType<T> = T extends unknown[] ? 'array' : 'group';

/**
 * Control with nested controls.
 *
 * 'controls' property should be array or another object
 */
export interface CompositeControl<T extends object>
  extends NgdfAbstractControlConfig {
  controls: T;
  type: CompositeControlType<T>;
}

/**
 * Сontrol with the ability to create copies of nested controls
 *
 * Based on {@link CompositeControl}
 */
export type NgdfFormArrayConfig = CompositeControl<NgdfFormControlConfig[]>;

/**
 * Default form config
 *
 * Based on {@link CompositeControl}
 */
export type NgdfFormGroupConfig = CompositeControl<{
  [key: string]: NgdfControlConfig;
}>;

export type NgdfControlConfig =
  | NgdfFormControlConfig
  | NgdfFormArrayConfig
  | NgdfFormGroupConfig;

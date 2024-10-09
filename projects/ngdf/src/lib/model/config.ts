import { AsyncValidator, AsyncValidatorFn, Validators } from '@angular/forms';

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
export type ControlValidatorKey =
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
export type ControlValidatorKeyWithFnArgument = Exclude<
  ControlValidatorKey,
  'required' | 'requiredTrue' | 'nullValidator' | 'email'
>;

/**
 * Argument types for Validators keys from {@link ControlValidatorKey}
 */
export type ControlValidatorArgumentTypeByKey<T extends ControlValidatorKey> =
  (typeof Validators)[T] extends (_: infer R) => unknown
    ? T extends ControlValidatorKeyWithFnArgument
      ? R
      : boolean
    : never;

/**
 * Config validators
 */
export type ControlValidators = {
  [key in ControlValidatorKey]?: ControlValidatorArgumentTypeByKey<key>;
};

type ControlAsyncValidators =
  | AsyncValidator
  | AsyncValidator[]
  | AsyncValidatorFn
  | AsyncValidatorFn[];

/**
 * Base type for all dynamic controls / arrays / groups
 */
export interface NgdfAbstractControlConfig {
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  label?: string;
  validators?: ControlValidators;
  asyncValidators?: ControlAsyncValidators;
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

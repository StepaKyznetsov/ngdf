import { ValidatorFn, Validators } from '@angular/forms';
import { CrossControlDependency } from './dependencies';

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
export type ValidatorKeyWithWrapperFn = Exclude<
  ValidatorKey,
  'required' | 'requiredTrue' | 'nullValidator' | 'email'
>;

/**
 * Argument types for Validators keys from {@link ValidatorKey}
 */
export type ValidatorArgumentTypeByKey<T extends ValidatorKey> =
  T extends ValidatorKeyWithWrapperFn
    ? (typeof Validators)[T] extends (_: infer R) => ValidatorFn
      ? R
      : never
    : boolean;

export type ValidatorWrapperFn = (
  _: ValidatorArgumentTypeByKey<ValidatorKeyWithWrapperFn>,
) => ValidatorFn;

export interface NgdfValidatorBody<T extends ValidatorKey = ValidatorKey> {
  value?: ValidatorArgumentTypeByKey<T>;
  errorText?: string;
}

export type NgdfValidatorValue<T extends ValidatorKey = ValidatorKey> =
  | NgdfValidatorBody<T>
  | ValidatorArgumentTypeByKey<T>;

export type NgdfValidators = {
  [key in ValidatorKey]?: NgdfValidatorValue<key>;
};

/**
 * Base type for all dynamic controls / arrays / groups
 */
export interface NgdfAbstractControlConfig {
  hidden?: boolean;
  disabled?: boolean;
  label?: string;
  validators?: NgdfValidators;
  // asyncValidators?: NgdfAsyncValidators;
  type: NgdfControlType;
  dependentControls?: CrossControlDependency;
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
export type NgdfFormArrayConfig = CompositeControl<NgdfControlConfig[]>;

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

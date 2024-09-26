import { AsyncValidator, AsyncValidatorFn, Validators } from '@angular/forms';

/**
 * A basic set that will be expanded over time
 */
export type DynamicControlType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'toggle'
  | 'group'
  | 'array'
  | 'autocomplete'
  | 'checkbox'
  | 'radio';

/**
 * Validators keys from {@link Validators} class
 */
export type ControlValidatorKey = keyof Omit<
  typeof Validators,
  'prototype' | 'compose' | 'composeAsync'
>;

/**
 * Argument types for Validators keys from {@link ControlValidatorKey}
 */
export type ControlValidatorArgumentTypeByKey<T extends ControlValidatorKey> =
  (typeof Validators)[T] extends (_: infer R) => unknown ? R : never;

/**
 * Config validators
 */
export type DynamicControlValidators = {
  [key in ControlValidatorKey]: ControlValidatorArgumentTypeByKey<key>;
};

type DynamicControlAsyncValidators =
  | AsyncValidator
  | AsyncValidator[]
  | AsyncValidatorFn
  | AsyncValidatorFn[];

/**
 * Base type for all dynamic controls
 */
export interface DynamicAbstractControlConfig {
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  validators?: DynamicControlValidators;
  asyncValidators?: DynamicControlAsyncValidators;
}

/**
 * Control / form field
 */
export interface DynamicControlConfig<T = string>
  extends DynamicAbstractControlConfig {
  type?: DynamicControlType;
  options?: Option[];
  value: T;
}

/**
 * Select/autocomplete/radio/toggle options
 */
export interface Option<T extends string | number = string> {
  label: string;
  value: T | null;
}

/**
 * Control with nested controls.
 *
 * 'controls' property should be array or another object
 */
export interface CompositeControl<T extends object>
  extends DynamicAbstractControlConfig {
  controls: T;
}

/**
 * Сontrol with the ability to create copies of nested controls
 *
 * Based on {@link CompositeControl}
 */
export type DynamicArrayControlConfig = CompositeControl<
  DynamicControlConfig[]
>;

/**
 * Default form config
 *
 * Based on {@link CompositeControl}
 */
export type DynamicFormConfig = CompositeControl<{
  [key: string]:
    | DynamicControlConfig
    | DynamicArrayControlConfig
    | DynamicFormConfig;
}>;

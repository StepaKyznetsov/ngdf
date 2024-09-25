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
 * Validators keys
 */
export type ControlValidatorKey = keyof Omit<
  typeof Validators,
  'prototype' | 'compose' | 'composeAsync'
>;

/**
 * Argument types for Validators keys from {@link ControlValidatorKey}
 */
export type ControlValidatorValueByKey<T extends ControlValidatorKey> =
  (typeof Validators)[T] extends (_: infer R) => unknown ? R : never;

/**
 * https://stackoverflow.com/questions/74216110/set-type-for-the-key-values-of-object-entries-in-typescript
 */
export type Entries<T> = {
  [K in keyof T]: [key: K, value: T[K]];
}[keyof T][];

/**
 * Config validators
 */
export type DynamicControlValidators = {
  [key in ControlValidatorKey]: ControlValidatorValueByKey<key>;
};

type DynamicControlAsyncValidators =
  | AsyncValidator
  | AsyncValidator[]
  | AsyncValidatorFn
  | AsyncValidatorFn[];

/**
 * Basic control of the library
 */
export interface DynamicControlConfig<T = string> {
  type?: DynamicControlType;
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  validators?: DynamicControlValidators;
  asyncValidators?: DynamicControlAsyncValidators;
  options?: Option[];
  value: T;
}

/**
 * Select/autocomplete/radio/toggle controls options
 */
export interface Option<T extends string | number = string> {
  label: string;
  value: T | null;
}

type CompositeControl = Omit<DynamicControlConfig, 'value' | 'type'>;

/**
 * Сontrol with the ability to create copies of nested controls
 *
 * It is based on a FormArray
 */
export interface DynamicArrayControlConfig extends CompositeControl {
  controls: DynamicControlConfig[];
}

/**
 * Default form config
 *
 * It is based on a FormGroup
 */
export interface DynamicFormConfig extends CompositeControl {
  controls: {
    [key: string]:
      | DynamicControlConfig
      | DynamicArrayControlConfig
      | DynamicFormConfig;
  };
}

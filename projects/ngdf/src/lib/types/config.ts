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
 * Config validators
 */
type DynamicControlValidators = {
  [key in keyof typeof Validators]: boolean | string | number | RegExp;
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
  id?: string;
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

/**
 * Сontrol with the ability to create copies of nested controls
 *
 * It is based on a FormArray
 */
export interface DynamicArrayControlConfig
  extends Omit<DynamicControlConfig, 'validators' | 'value'> {
  controls: DynamicControlConfig[];
}

/**
 * Default form config = dynamic form group
 *
 * It is based on a FormGroup
 */
export interface DynamicFormConfig {
  [key: string]:
    | DynamicControlConfig
    | DynamicFormConfig
    | DynamicArrayControlConfig;
}

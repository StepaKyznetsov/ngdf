import { AsyncValidator, AsyncValidatorFn, Validators } from '@angular/forms';

/**
 * A basic set that will be expanded over time
 */
export type ControlType =
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
type ControlValidators = {
  [key in keyof typeof Validators]: boolean | string | number | RegExp;
};

type ControlAsyncValidators =
  | AsyncValidator
  | AsyncValidator[]
  | AsyncValidatorFn
  | AsyncValidatorFn[];

/**
 * Basic control of the library
 */
export interface Control {
  id?: string;
  name?: string;
  type?: ControlType;
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  validators?: ControlValidators;
  asyncValidators?: ControlAsyncValidators;
  value: unknown;
}

type CompositeControl = Omit<Control, 'validators'>;

/**
 * Сontrol with the ability to create copies of nested controls
 *
 * It is based on a FormArray
 */
export interface ArrayControl extends Omit<CompositeControl, 'value'> {
  controls: Control[];
}

/**
 * An object containing a hierarchy of controls
 *
 * It is based on a FormGroup
 */
export interface GroupControl extends CompositeControl {
  controls: { [key: string]: Control };
}

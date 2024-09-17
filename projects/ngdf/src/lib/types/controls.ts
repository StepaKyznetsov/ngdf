import { Validators } from '@angular/forms';

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
  | 'set'
  | 'array'
  | 'autocomplete'
  | 'checkbox'
  | 'radio';

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
  validators?: { [key in keyof typeof Validators]: boolean };
  asyncValidators?: unknown[];
  value: unknown;
}

export type CompositeControl = Omit<Control, 'validators'>;

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
export type SetControl = CompositeControl & {
  controls: { [key: string]: Control };
};

import { AbstractControl } from '@angular/forms';

/**
 * Returning same value
 */
export const copy = <T>(value: T): T => {
  return value;
};

/**
 * Value booleanization
 */
export const boolean = <T>(value: T): boolean => {
  return !!value;
};

/**
 * Сonverting the value to a boolean value and then changing the value to the opposite
 */
export const booleanInvert = <T>(value: T): boolean => {
  return !value;
};

/**
 * Get a positive value if the value is in the fromObject array
 * or is a key when fromObject is an object
 */
export const valueFrom = <T, U extends object = object>(
  value: T,
  fromObject: U,
): boolean => {
  if (Array.isArray(fromObject)) {
    return fromObject.includes(value);
  }

  return Object.keys(fromObject).includes(String(value));
};

/**
 * Get a negative value if the value is in the fromObject array
 * or is not a key when fromObject is an object
 */
export const valueFromInvert = <T, U extends object = object>(
  value: T,
  fromObject: U,
): boolean => {
  return !valueFrom(value, fromObject);
};

export const toNull = (): null => {
  return null;
};

export const toEmptyString = (): string => {
  return '';
};

export const toTrue = (): boolean => {
  return true;
};

export const toFalse = (): boolean => {
  return false;
};

export const equal = <T>(a: T, b: T): boolean => {
  return Object.is(a, b);
};

export const nonEqual = <T>(a: T, b: T): boolean => {
  return !Object.is(a, b);
};

export const more = (a: number, b: number): boolean => {
  return a > b;
};

export const moreOrEqual = (a: number, b: number): boolean => {
  return a >= b;
};

export const less = (a: number, b: number): boolean => {
  return a < b;
};

export const lessOrEqual = (a: number, b: number): boolean => {
  return a <= b;
};

export const touched = (control: AbstractControl): boolean => {
  return control.touched;
};

export const pristine = (control: AbstractControl): boolean => {
  return control.pristine;
};

export const valid = (control: AbstractControl): boolean => {
  return control.valid;
};

export const invalid = (control: AbstractControl): boolean => {
  return control.invalid;
};

export const pending = (control: AbstractControl): boolean => {
  return control.pending;
};

export const dirty = (control: AbstractControl): boolean => {
  return control.dirty;
};

export const untouched = (control: AbstractControl): boolean => {
  return control.untouched;
};

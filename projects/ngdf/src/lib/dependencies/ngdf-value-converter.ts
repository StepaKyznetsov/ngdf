import { AbstractControl } from '@angular/forms';

export class NgdfValueConverter {
  /**
   * Returning same value
   */
  static copy<T>(value: T): T {
    return value;
  }

  /**
   * Value booleanization
   */
  static boolean<T>(value: T): boolean {
    return !!value;
  }

  /**
   * Сonverting the value to a boolean value and then changing the value to the opposite
   */
  static booleanInvert<T>(value: T): boolean {
    return !value;
  }

  /**
   * Get a positive value if the value is in the fromObject array
   * or is a key when fromObject is an object
   */
  static valueFrom<T, U extends object = object>(
    value: T,
    fromObject: U,
  ): boolean {
    if (Array.isArray(fromObject)) {
      return fromObject.includes(value);
    }

    return Object.keys(fromObject).includes(String(value));
  }

  /**
   * Get a negative value if the value is in the fromObject array
   * or is not a key when fromObject is an object
   */
  static valueFromInvert<T, U extends object = object>(
    value: T,
    fromObject: U,
  ): boolean {
    return !this.valueFrom(value, fromObject);
  }

  // /**
  //  *
  //  */
  // static toValue<T = unknown>(value: T): T {
  //   return value;
  // }

  static toNull(): null {
    return null;
  }

  static toEmptyString(): string {
    return '';
  }

  static toTrue(): boolean {
    return true;
  }

  static toFalse(): boolean {
    return false;
  }

  static equal<T>(a: T, b: T): boolean {
    return Object.is(a, b);
  }

  static nonEqual<T>(a: T, b: T): boolean {
    return !Object.is(a, b);
  }

  static more(a: number, b: number): boolean {
    return a > b;
  }

  static moreOrEqual(a: number, b: number): boolean {
    return a >= b;
  }

  static less(a: number, b: number): boolean {
    return a < b;
  }

  static lessOrEqual(a: number, b: number): boolean {
    return a <= b;
  }

  static touched(control: AbstractControl): boolean {
    return control.touched;
  }

  static pristine(control: AbstractControl): boolean {
    return control.pristine;
  }

  static valid(control: AbstractControl): boolean {
    return control.valid;
  }

  static invalid(control: AbstractControl): boolean {
    return control.invalid;
  }

  static pending(control: AbstractControl): boolean {
    return control.pending;
  }

  static dirty(control: AbstractControl): boolean {
    return control.dirty;
  }

  static untouched(control: AbstractControl): boolean {
    return control.untouched;
  }
}

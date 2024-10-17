import { AbstractControl } from '@angular/forms';

export class NgdfValueConverter {
  static copy<T>(value: T): T {
    return value;
  }

  static boolean<T>(value: T): boolean {
    return Boolean(value);
  }

  static booleanInvert<T>(value: T): boolean {
    return !this.boolean(value);
  }

  static valueFrom<T, U extends object = object>(
    value: T,
    fromObject: U,
  ): boolean {
    if (Array.isArray(fromObject)) {
      return fromObject.includes(value);
    }

    return Object.keys(fromObject).includes(String(value));
  }

  static valueFromInvert<T, U extends object = object>(
    value: T,
    fromObject: U,
  ): boolean {
    return !this.valueFrom(value, fromObject);
  }

  static toValue<T = unknown>(value: T): T {
    return value;
  }

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

  static more(a: number, b: number): boolean {
    return a > b;
  }

  static less(a: number, b: number): boolean {
    return a < b;
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

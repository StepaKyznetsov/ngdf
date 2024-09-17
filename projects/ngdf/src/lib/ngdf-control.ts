import { Directive, InjectionToken } from '@angular/core';
import { AbstractControl, FormControl, Validator } from '@angular/forms';
import { Control } from './types/controls';

export interface NgdfControl<T extends AbstractControl = FormControl> {
  control?: T;
  setProps(config: Control): void;
  setValue(value: unknown): void;
  resetValue(): void;
  addValidators?(...validators: Validator[]): void;
}

@Directive()
export class BaseNgdfControl {}

export const NGDF_CONTROL = new InjectionToken<ReadonlyArray<NgdfControl>>(
  'Array of registered controls',
);

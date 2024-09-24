import { AbstractControl, FormControl, Validator } from '@angular/forms';
import { DynamicControlConfig } from './config';

export interface NgdfControl<T extends AbstractControl = FormControl> {
  control?: T;
  setProps(config: DynamicControlConfig): void;
  setValue(value: unknown): void;
  resetValue?(): void;
  addValidators?(...validators: Validator[]): void;
}

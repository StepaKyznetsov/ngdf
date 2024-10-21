import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { NgdfFormGroup } from './manageable-control';

/**
 *
 * @see {@link FormGroup}
 */
export function ngdfFormGroup<
  T extends {
    [K in keyof T]: AbstractControl<any>;
  } = any,
>(
  ...constructorParameters: ConstructorParameters<typeof FormGroup<T>>
): ControlWithDependencies<FormGroup<T>> {
  return new NgdfFormGroup<T>(...constructorParameters);
}

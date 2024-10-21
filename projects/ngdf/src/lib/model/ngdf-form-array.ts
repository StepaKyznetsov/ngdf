import { AbstractControl, FormArray } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { NgdfFormArray } from './manageable-control';

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<
  T extends AbstractControl<any> = AbstractControl<any>,
>(
  ...constructorParameters: ConstructorParameters<typeof FormArray<T>>
): ControlWithDependencies<FormArray<T>> {
  return new NgdfFormArray(...constructorParameters);
}

import { FormArray } from '@angular/forms';
import { NgdfAbstractControl, NgdfFormArray } from '../types/controls';
import { ngdfControl } from './ngdf-control';

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<T extends NgdfAbstractControl = any>(
  ...constructorParameters: ConstructorParameters<typeof FormArray<T>>
): NgdfFormArray<T> {
  const formArray = ngdfControl<T>(FormArray);
  return new formArray(...constructorParameters);
}

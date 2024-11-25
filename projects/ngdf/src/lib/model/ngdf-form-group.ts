import { FormGroup } from '@angular/forms';
import { NgdfAbstractControl, NgdfFormGroup } from '../types/controls';
import { ngdfControl } from './ngdf-control';

/**
 *
 * @see {@link FormGroup}
 */
export function ngdfFormGroup<
  T extends {
    [K in keyof T]: NgdfAbstractControl;
  } = any,
>(
  ...constructorParameters: ConstructorParameters<typeof FormGroup<T>>
): NgdfFormGroup<T> {
  const formGroup = ngdfControl<T>(FormGroup);
  return new formGroup(...constructorParameters);
}

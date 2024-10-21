import { FormControl } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { NgdfFormControl } from './manageable-control';

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
): ControlWithDependencies<FormControl<T | null>> {
  return new NgdfFormControl(...constructorParameters);
}

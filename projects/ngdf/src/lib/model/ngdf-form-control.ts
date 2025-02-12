import { FormControl } from '@angular/forms';
import { NgdfFormControl } from '../types/controls';
import { ngdfControl } from './ngdf-control';

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
): NgdfFormControl<T> {
  const formControl = ngdfControl<T>(FormControl);
  return new formControl(...constructorParameters);
}

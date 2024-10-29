import { FormControl } from '@angular/forms';
import { NgdfFormControl } from '../types';
import { withDependencies } from '../utils';

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
): NgdfFormControl<T> {
  const formControl = withDependencies(FormControl);
  return new formControl<any>(...constructorParameters);
}

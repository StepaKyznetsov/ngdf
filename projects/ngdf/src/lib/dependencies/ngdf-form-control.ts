import { FormControl } from '@angular/forms';
import { manager } from './manager-control';

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  constructorParameters: ConstructorParameters<typeof FormControl<T>>,
) {
  return new (manager(FormControl<T>))(...constructorParameters);
}

import { FormControl } from '@angular/forms';
import { managerControl } from './manager-control';

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
) {
  return new (managerControl(FormControl<T>))(...constructorParameters);
}

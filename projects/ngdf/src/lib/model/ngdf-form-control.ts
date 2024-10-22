import { FormControl } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { withDependencies } from '../utils';

/**
 * FormControl with dependent controls
 */
const NgdfFormControl = withDependencies(FormControl<any>);

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
): ControlWithDependencies<FormControl<T>> {
  return new NgdfFormControl(...constructorParameters);
}

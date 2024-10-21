import { FormControl } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { withDependentControls } from './with-dependent-controls';

/**
 * FormControl with dependent controls
 */
const NgdfFormControl = withDependentControls(FormControl);

/**
 *
 * @see {@link FormControl}
 */
export function ngdfFormControl<T = any>(
  ...constructorParameters: ConstructorParameters<typeof FormControl<T>>
): ControlWithDependencies<FormControl<T | null>> {
  return new NgdfFormControl(...constructorParameters);
}

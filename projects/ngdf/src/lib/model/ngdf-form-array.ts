import { AbstractControl, FormArray } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { withDependentControls } from './with-dependent-controls';

/**
 * FormArray with dependent controls
 */
const NgdfFormArray = withDependentControls(FormArray);

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

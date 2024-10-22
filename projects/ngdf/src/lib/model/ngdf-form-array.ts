import { AbstractControl, FormArray } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { withDependencies } from './with-dependencies';

/**
 * FormArray with dependent controls
 */
const NgdfFormArray = withDependencies(FormArray);

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<
  T extends ControlWithDependencies<AbstractControl> = any,
>(
  ...constructorParameters: ConstructorParameters<typeof FormArray<T>>
): ControlWithDependencies<FormArray<T>> {
  return new NgdfFormArray(...constructorParameters);
}

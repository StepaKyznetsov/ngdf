import { AbstractControl, FormArray } from '@angular/forms';
import { ControlWithDependencies, NgdfFormArray } from '../types';
import { withDependencies } from '../utils';

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<
  T extends ControlWithDependencies<AbstractControl> = any,
>(
  ...constructorParameters: ConstructorParameters<typeof FormArray<T>>
): NgdfFormArray<T> {
  const formArray = withDependencies(FormArray);
  return new formArray<T>(...constructorParameters);
}

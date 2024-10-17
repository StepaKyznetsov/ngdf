import { AbstractControl, FormArray } from '@angular/forms';
import { manager } from './manager-control';

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<T extends AbstractControl<any> = any>(
  constructorParameters: ConstructorParameters<typeof FormArray<T>>,
) {
  return new (manager(FormArray<T>))(...constructorParameters);
}

import { AbstractControl, FormArray } from '@angular/forms';
import { managerControl } from './manager-control';

/**
 *
 * @see {@link FormArray}
 */
export function ngdfFormArray<
  T extends AbstractControl<any> = AbstractControl<any>,
>(...constructorParameters: ConstructorParameters<typeof FormArray<T>>) {
  return new (managerControl(FormArray<T>))(...constructorParameters);
}

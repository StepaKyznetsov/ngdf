import { AbstractControl, FormGroup } from '@angular/forms';
import { manager } from './manager-control';

/**
 *
 * @see {@link FormGroup}
 */
export function ngdfFormGroup<
  T extends {
    [K in keyof T]: AbstractControl<any>;
  } = any,
>(constructorParameters: ConstructorParameters<typeof FormGroup<T>>) {
  return new (manager(FormGroup<T>))(...constructorParameters);
}

import { AbstractControl, FormGroup } from '@angular/forms';
import { managerControl } from './manager-control';

/**
 *
 * @see {@link FormGroup}
 */
export function ngdfFormGroup<
  T extends {
    [K in keyof T]: AbstractControl<any>;
  } = any,
>(...constructorParameters: ConstructorParameters<typeof FormGroup<T>>) {
  return new (managerControl(FormGroup<T>))(...constructorParameters);
}

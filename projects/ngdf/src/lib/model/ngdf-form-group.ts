import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlWithDependencies, NgdfFormGroup } from '../types';
import { withDependencies } from '../utils';

/**
 *
 * @see {@link FormGroup}
 */
export function ngdfFormGroup<
  T extends {
    [K in keyof T]: ControlWithDependencies<AbstractControl>;
  } = any,
>(
  ...constructorParameters: ConstructorParameters<typeof FormGroup<T>>
): NgdfFormGroup<T> {
  const formGroup = withDependencies(FormGroup);
  return new formGroup<T>(...constructorParameters);
}



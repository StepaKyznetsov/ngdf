import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlWithDependencies } from '../types';
import { withDependencies } from '../utils';

/**
 * FormGroup with dependent controls
 */
const NgdfFormGroup = withDependencies(FormGroup);

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
): ControlWithDependencies<FormGroup<T>> {
  return new NgdfFormGroup<T>(...constructorParameters);
}

import { AbstractControl, FormGroup } from '@angular/forms';
import { CrossControlDependency } from '../types';
import { findControlInFormGroup } from '../utils';

type GConstructor<T = object> = new (...args: any[]) => T;
type GAbstractControl<T = any> = GConstructor<AbstractControl<T>>;

export function manager<TControl extends GAbstractControl<U>, U = any>(
  Control: TControl,
) {
  //@ts-expect-error non implemented abstract methods
  return class extends Control<U> {
    private _dependentControls: Map<
      CrossControlDependency,
      AbstractControl
    > | null = null;

    setDependentControls(
      formGroup: FormGroup,
      dependencies: CrossControlDependency[],
    ): void {
      (this._dependentControls ??= new Map()).clear();
      dependencies.forEach((dependency) => {
        const {
          control: { key },
        } = dependency;
        const control = findControlInFormGroup(key, formGroup);
        if (control) {
          this._dependentControls!.set(dependency, control);
        }
      });
    }

    clearDependentControls(): void {
      this._dependentControls = null;
    }
  };
}

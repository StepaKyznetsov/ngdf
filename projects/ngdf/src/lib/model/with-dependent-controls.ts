import { AbstractControl, FormGroup } from '@angular/forms';
import { CrossControlDependency } from '../types';
import { findControlInFormGroup } from '../utils';

type Constructor<T = any> = new (...args: any[]) => T;

/**
 * Mixin for adding functionality related to dependent controls
 * @param Base base class
 */
export function withDependentControls<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
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

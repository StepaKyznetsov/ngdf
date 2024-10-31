import { AbstractControl, FormGroup } from '@angular/forms';
import { CrossControlDependency } from '../types';
import { findControlInFormGroup } from './find-control';

type Constructor<T = any> = new (...args: any[]) => T;

/**
 * Mixin for adding functionality related to dependent controls
 *
 * May be used in the future not only for controls
 * @param Base base class
 */
export function withDependencies<T extends Constructor>(Base: T) {
  return class extends Base {
    _dependentControls: Map<CrossControlDependency, AbstractControl> | null =
      null;

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

    getDependentControls(): typeof this._dependentControls {
      return this._dependentControls;
    }

    clearDependentControls(): void {
      this._dependentControls = null;
    }
  };
}
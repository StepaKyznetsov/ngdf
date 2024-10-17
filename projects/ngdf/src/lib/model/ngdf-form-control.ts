import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CrossControlDependency } from '../types';
import { findControlInFormGroup } from '../utils';

// https://stackoverflow.com/questions/73867881/subclassing-formcontrol-triggers-ts2510-base-constructors-must-all-have-the-sa
export class NgdfFormControl<T = any> extends FormControl<T | null> {
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
}

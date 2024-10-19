import { AbstractControl, FormGroup } from '@angular/forms';
import { CrossControlDependency } from '../types';
import { findControlInFormGroup } from '../utils';

type AbstractConstructor<T> = abstract new (...args: any[]) => T;

type AbstractControlConstructor<T = any> = AbstractConstructor<
  AbstractControl<T>
>;

export function managerControl<
  T extends AbstractControlConstructor<U>,
  U = any,
>(Control: T): T & AbstractControlConstructor<U> {
  abstract class ManagerControl extends Control {
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

  return ManagerControl;
}

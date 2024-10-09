import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ControlValidatorArgumentTypeByKey,
  ControlValidatorKey,
  ControlValidatorKeyWithFnArgument,
  ControlValidators,
  NgdfFormArrayConfig,
  NgdfFormControlConfig,
  NgdfFormGroupConfig,
} from './model/config';
import { isFormArrayConfig, isValidatorKeyWithFnArgument } from './utils';

const valueExistAndNotFalse = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== false;

/**
 * This is not a builder in the classical sense,
 * at the moment it is more of an adapter that allows you to
 * create a form group / array / control from the config.
 */
@Injectable({
  providedIn: 'root',
})
export class NgdfFormBuilder {
  /**
   * Angular {@link FormGroup} creating from {@link DynamicFormConfig}
   * @param config lib's FormGroup config
   */
  buildGroup(
    config: NgdfFormGroupConfig,
    validators?: ValidatorFn[],
  ): FormGroup {
    const formGroup = new FormGroup({}, validators);
    for (const [name, control] of Object.entries(config.controls)) {
      const validators = this.resolveValidators(control.validators);
      if ('controls' in control) {
        if (isFormArrayConfig(control)) {
          formGroup.addControl(name, this.buildFormArray(control, validators));
        } else {
          formGroup.addControl(name, this.buildGroup(control, validators));
        }
      } else {
        formGroup.addControl(name, this.buildControl(control, validators));
      }
    }

    return formGroup;
  }

  /**
   * Angular {@link FormArray} creating from {@link DynamicArrayControlConfig}
   * @param arrayConfig lib's FormArray config
   */
  buildFormArray(
    arrayConfig: NgdfFormArrayConfig,
    validators?: ValidatorFn[],
  ): FormArray {
    return new FormArray(
      arrayConfig.controls.map((control) => this.buildControl(control)),
      validators,
    );
  }

  /**
   * Angular {@link FormControl} creating from {@link DynamicControlConfig}
   * @param controlConfig lib's DynamicControlConfig config
   */
  buildControl<T>(
    controlConfig: NgdfFormControlConfig<T>,
    validators?: ValidatorFn[],
  ): FormControl {
    const { value, disabled } = controlConfig;
    return new FormControl<T>(
      { value, disabled: !!disabled },
      validators ?? this.resolveValidators(controlConfig.validators),
    );
  }

  /**
   * Method to get an array of Angular control validators from the {@link DynamicControlValidators}
   * @param validators object with { key : value } validators structure
   */
  resolveValidators(validators?: ControlValidators): ValidatorFn[] {
    if (!validators) {
      return [];
    }

    return Object.entries(validators)
      .filter(
        (
          entry,
        ): entry is [
          ControlValidatorKey,
          ControlValidatorArgumentTypeByKey<ControlValidatorKeyWithFnArgument>,
        ] => valueExistAndNotFalse(entry[1]),
      )
      .map(([key, value]) => {
        if (isValidatorKeyWithFnArgument(key)) {
          return Validators[key](value);
        }

        return Validators[key];
      });
  }
}

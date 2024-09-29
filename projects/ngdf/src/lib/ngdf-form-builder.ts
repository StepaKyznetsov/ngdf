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
  DynamicArrayControlConfig,
  DynamicControlConfig,
  DynamicControlValidators,
  DynamicFormConfig,
} from './types/config';

const VALIDATORS_WITH_ARGUMENT: ControlValidatorKey[] = [
  'min',
  'max',
  'minLength',
  'maxLength',
  'pattern',
];

/**
 * Helper for narrowing (DynamicArrayControlConfig | DynamicFormConfig) type
 */
const isDynamicArrayControlConfig = (
  config: DynamicArrayControlConfig | DynamicFormConfig,
): config is DynamicArrayControlConfig => Array.isArray(config.controls);

/**
 * Helper for narrowing (DynamicArrayControlConfig | DynamicFormConfig) type
 */
const isValidatorKeyWithFnArgument = (
  key: ControlValidatorKey,
): key is ControlValidatorKeyWithFnArgument =>
  VALIDATORS_WITH_ARGUMENT.includes(key);

const truelyValue = (value: unknown): boolean =>
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
  buildGroup(config: DynamicFormConfig, validators?: ValidatorFn[]): FormGroup {
    const formGroup = new FormGroup({}, validators);
    for (const [name, control] of Object.entries(config.controls)) {
      const validators = this.resolveValidators(control.validators);
      if ('controls' in control) {
        if (isDynamicArrayControlConfig(control)) {
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
    arrayConfig: DynamicArrayControlConfig,
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
  buildControl<T = string>(
    controlConfig: DynamicControlConfig<T>,
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
  resolveValidators(validators?: DynamicControlValidators): ValidatorFn[] {
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
        ] => truelyValue(entry[1]),
      )
      .map(([key, value]) => {
        if (isValidatorKeyWithFnArgument(key)) {
          return Validators[key](value);
        }

        return Validators[key];
      });
  }
}

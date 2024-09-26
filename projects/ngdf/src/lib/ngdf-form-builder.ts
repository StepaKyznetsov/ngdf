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
  DynamicArrayControlConfig,
  DynamicControlConfig,
  DynamicControlValidators,
  DynamicFormConfig,
} from './types/config';

const VALIDATORS_WITH_ARGUMENT = [
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

// /**
//  * 
//  */
// const isControlValidatorKey = (key: string): key is ControlValidatorKey => {
//   return key in Validators;
// };

/**
 * This is not a builder in the classical sense,
 * at the moment it is more of an adapter that allows you to
 * create a form group from the config.
 */
@Injectable({
  providedIn: 'root',
})
export class NgdfFormBuilder {
  /**
   * Angular {@link FormGroup} creating from {@link DynamicFormConfig}
   * @param config lib's FormGroup config
   * @returns FormGroup
   */
  buildForm(config: DynamicFormConfig, validators?: ValidatorFn[]): FormGroup {
    const formGroup = new FormGroup({}, validators);
    for (const [name, control] of Object.entries(config.controls)) {
      const validators = this.resolveValidators(control.validators);
      if ('controls' in control) {
        if (isDynamicArrayControlConfig(control)) {
          formGroup.addControl(name, this.buildFormArray(control, validators));
        } else {
          formGroup.addControl(name, this.buildForm(control, validators));
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
   * @returns FormArray
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
   * @returns FormControl
   */
  buildControl<T>(
    controlConfig: DynamicControlConfig<T>,
    validators?: ValidatorFn[],
  ): FormControl<T | null> {
    return new FormControl<T | null>(
      controlConfig.value,
      validators ?? this.resolveValidators(controlConfig.validators),
    );
  }

  /**
   * Method to get an array of Angular control validators from the {@link DynamicControlValidators}
   * @param validators object with { key : value } validators structure
   * @returns array of validators
   *
   * @note need to optimize O(3n)
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
          ControlValidatorArgumentTypeByKey<ControlValidatorKey>,
        ] => typeof entry[1] === 'boolean' && entry[1],
      )
      .map(([key, value]) => {
        if (VALIDATORS_WITH_ARGUMENT.includes(key)) {
          return Validators[key](value);
        }

        return Validators[key];
      })
      .filter((validator): validator is ValidatorFn => !!validator);
  }
}

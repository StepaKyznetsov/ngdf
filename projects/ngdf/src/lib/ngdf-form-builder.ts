import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ControlValidatorKey,
  ControlValidatorValueByKey,
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
 * Type narrowing helper
 * @param config
 * @returns
 */
const isDynamicArrayControlConfig = (
  config: DynamicArrayControlConfig | DynamicFormConfig,
): config is DynamicArrayControlConfig => Array.isArray(config.controls);

@Injectable({
  providedIn: 'root',
})
export class NgdfFormBuilder {
  /**
   *
   * @param config
   * @returns
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
   *
   * @param arrayConfig
   * @returns
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
   *
   * @param controlConfig
   * @returns
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
   *
   * @param validators
   * @returns
   * need to optimize O(3n)
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
          ControlValidatorValueByKey<ControlValidatorKey>,
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

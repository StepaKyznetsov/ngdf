import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  NgdfControlConfig,
  NgdfFormArrayConfig,
  NgdfFormControlConfig,
  NgdfFormGroupConfig,
  NgdfValidators,
  NgdfValidatorValue,
  ValidatorKey,
  ValidatorWrapperFn,
} from './model';
import {
  isBoolean,
  isDefined,
  isFormArrayConfig,
  isFormGroupConfig,
  isObject,
  isRegExp,
  isTruthy,
  isValidatorKeyWithWrapperFn,
} from './utils';

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
    // only root config case
    if (!validators) {
      validators = this.resolveValidators(config.validators);
    }

    const formGroup = new FormGroup({}, validators);
    for (const [name, control] of Object.entries(config.controls)) {
      const nestedControlvalidators = this.resolveValidators(
        control.validators,
      );
      formGroup.addControl(
        name,
        this.generateControl(control, nestedControlvalidators),
      );
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

  private generateControl(
    config: NgdfControlConfig,
    validators: ValidatorFn[],
  ): AbstractControl {
    if (isFormGroupConfig(config)) {
      return this.buildGroup(config, validators);
    } else if (isFormArrayConfig(config)) {
      return this.buildFormArray(config, validators);
    }

    return this.buildControl(config, validators);
  }

  /**
   * Method to get an array of Angular control validators from the {@link DynamicControlValidators}
   * @param validators object with { key : value } validators structure
   */
  resolveValidators(validators?: NgdfValidators): ValidatorFn[] {
    if (!validators) {
      return [];
    }

    return this.createValidatorsWithCustomData(validators);
  }

  /**
   *
   * @param validators
   */
  private createValidatorsWithCustomData(
    validators: NgdfValidators,
  ): ValidatorFn[] {
    return (Object.entries(validators) as [ValidatorKey, NgdfValidatorValue][])
      .map(([key, validatorBody]) => {
        const validatorFn = this.createValidatorFn(key, validatorBody);
        if (
          !isRegExp(validatorBody) &&
          isObject(validatorBody) &&
          validatorFn
        ) {
          return (control: AbstractControl): ValidationErrors | null => {
            const { errorText } = validatorBody;
            const error: ValidationErrors | null = validatorFn(control);

            return error ? { [key]: errorText } : null;
          };
        }

        return validatorFn;
      })
      .filter(isTruthy);
  }

  /**
   * ```ts
   * const validators = {
   *   required: true;
   *   min: 2
   * }
   * ```
   * OR
   * ```ts
   * const validators = {
   *   required: {
   *     value: true,
   *     errorText: 'You must type something here'
   *   };
   *   min: {
   *     value: 4,
   *     errorText: 'Value should be at least 4 chars'
   *   }
   * }
   * ```
   *
   * @param key validator key
   * @param validatorBody validator body
   * @returns
   */
  private createValidatorFn(
    key: ValidatorKey,
    validatorBody: NgdfValidatorValue,
  ): ValidatorFn | null {
    const withWrapperArgument = isValidatorKeyWithWrapperFn(key);
    // TODO: refactor
    if (isObject(validatorBody) && !isRegExp(validatorBody)) {
      if (
        withWrapperArgument &&
        isDefined(validatorBody.value) &&
        !isBoolean(validatorBody.value)
      ) {
        return (Validators[key] as ValidatorWrapperFn)(validatorBody.value);
      }

      return !withWrapperArgument ? Validators[key] : null;
    }

    if (!withWrapperArgument && isBoolean(validatorBody)) {
      return Validators[key];
    }

    if (withWrapperArgument && !isBoolean(validatorBody)) {
      return (Validators[key] as ValidatorWrapperFn)(validatorBody);
    }

    return null;
  }
}

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ngdfFormArray } from './model/ngdf-form-array';
import { ngdfFormControl } from './model/ngdf-form-control';
import { ngdfFormGroup } from './model/ngdf-form-group';
import {
  NgdfControlConfig,
  NgdfFormArrayConfig,
  NgdfFormControlConfig,
  NgdfFormGroupConfig,
  NgdfValidators,
  NgdfValidatorValue,
  ValidatorKey,
  ValidatorWrapperFn,
} from './types/config';
import {
  NgdfAbstractControl,
  NgdfFormArray,
  NgdfFormControl,
  NgdfFormGroup,
} from './types/controls';
import {
  isBoolean,
  isFormArrayConfig,
  isFormGroupConfig,
  isNonNullable,
  isObject,
  isRegExp,
  isValidatorKeyWithWrapperFn,
} from './utils/type-narrowing';
import { typedEntries } from './utils/typed-entries';

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
   * @param config NgdfFormGroup config
   */
  group<
    T extends {
      [K in keyof T]: NgdfAbstractControl;
    } = any,
  >(
    config: NgdfFormGroupConfig,
    validators?: ValidatorFn[] | null,
  ): NgdfFormGroup<T> {
    // only root config case
    validators ??= this.resolveValidators(config.validators);

    const formGroup = ngdfFormGroup<T>({} as T, validators);
    for (const control of config.controls) {
      const nestedControlvalidators = this.resolveValidators(
        control.validators,
      );
      formGroup.addControl(
        control.key,
        this.buildControl(control, nestedControlvalidators),
      );
    }

    return formGroup;
  }

  /**
   * Angular {@link FormArray} creating from {@link DynamicArrayControlConfig}
   *
   * @param arrayConfig NgdfFormArray config
   */
  formArray<
    T extends NgdfControlConfig = any,
    U extends NgdfAbstractControl = any,
  >(
    arrayConfig: NgdfFormArrayConfig<T>,
    validators?: ValidatorFn[] | null,
  ): NgdfFormArray<U> {
    return ngdfFormArray<U>(
      arrayConfig.controls.map((control) => {
        const validators = this.resolveValidators(control.validators);
        return this.buildControl<T, U>(control, validators)!;
      }),
      validators,
    );
  }

  /**
   * Angular {@link FormControl} creating from {@link DynamicControlConfig}
   * @param controlConfig NgdfFormControl config
   */
  control<T = any>(
    controlConfig: NgdfFormControlConfig<T>,
    validators?: ValidatorFn[] | null,
  ): NgdfFormControl<T> {
    const { value, disabled } = controlConfig;
    return ngdfFormControl<T>(
      { value: value, disabled: !!disabled },
      validators,
    );
  }

  /**
   *
   * @FIXME typing
   *
   * @param config
   * @param validators
   */
  private buildControl<
    T extends NgdfControlConfig = any,
    U extends NgdfAbstractControl = any,
  >(config: T, validators: ValidatorFn[] | null): U {
    if (isFormGroupConfig(config)) {
      return this.group(config, validators) as unknown as U;
    } else if (isFormArrayConfig(config)) {
      return this.formArray(config, validators) as unknown as U;
    }

    return this.control(config, validators) as unknown as U;
  }

  /**
   * Method to get an array of Angular control validators from the {@link DynamicControlValidators}
   * @param validators object with { key : value } validators structure
   */
  resolveValidators(validators?: NgdfValidators): ValidatorFn[] | null {
    if (!validators) {
      return null;
    }

    return typedEntries<ValidatorKey, NgdfValidatorValue>(validators)
      .map(([key, validatorBody]) => {
        const validatorFn = this.createValidatorFn(key, validatorBody);
        if (
          !isRegExp(validatorBody) &&
          isObject(validatorBody) &&
          validatorFn
        ) {
          return (control: AbstractControl): ValidationErrors | null => {
            const { errorText } = validatorBody;
            const error = validatorFn(control);

            return error ? { [key]: errorText } : null;
          };
        }

        return validatorFn;
      })
      .filter(isNonNullable);
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
        isNonNullable(validatorBody.value) &&
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

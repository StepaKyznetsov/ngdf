import { NgdfControlConfig, NgdfFormGroupConfig } from '../model';
import { isFormGroupConfig } from './type-narrowing';

/**
 * Find control in form group config
 *
 * @param key control key
 * @param formGroup the parent group from which the search begins
 * @param recursive need for recursive search in all nested groups including the parent group
 */
export const findControlInConfig = (
  key: string,
  formGroup: NgdfFormGroupConfig,
  recursive?: boolean,
): NgdfControlConfig | undefined => {
  const control = formGroup.controls[key];

  if (recursive && !control) {
    for (const controlItem of Object.values(formGroup.controls)) {
      if (isFormGroupConfig(controlItem)) {
        const nestedControl = findControlInConfig(key, controlItem, recursive);
        if (nestedControl) {
          return nestedControl;
        }
      }
    }
  }

  return control;
};

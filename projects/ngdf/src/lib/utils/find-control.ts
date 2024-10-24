import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Find control in form group
 *
 * @param key control key
 * @param formGroup the parent group from which the search begins
 * @param recursive need for recursive search in all nested groups including the parent group
 */
export const findControlInFormGroup = (
  key: string,
  formGroup: FormGroup,
): AbstractControl | undefined => {
  const control = formGroup.controls[key];

  if (!control) {
    for (const controlItem of Object.values(formGroup.controls)) {
      if (controlItem instanceof FormGroup) {
        const nestedControl = findControlInFormGroup(key, controlItem);
        if (nestedControl) {
          return nestedControl;
        }
      }
    }
  }

  return control;
};

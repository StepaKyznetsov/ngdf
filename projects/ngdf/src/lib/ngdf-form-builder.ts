import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig } from './types/config';

@Injectable({
  providedIn: 'root',
})
export class NgdfFormBuilder {
  buildForm(config: DynamicFormConfig): FormGroup {
    for (const [name, control] of Object.entries(config)) {
      console.log(name, control);
    }
    return new FormGroup([]);
  }
}

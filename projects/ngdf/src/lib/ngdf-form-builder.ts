import { inject, Injectable } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderAdapter extends FormBuilder {
  private readonly formBuilder = inject(FormBuilder);

  
}

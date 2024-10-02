import { Directive, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Directive({
  host: {
    'class': 'ngdf-control'
  },
})
export class NgdfBaseControl {
  protected readonly formGroup = inject(ControlContainer).control as FormGroup;
}

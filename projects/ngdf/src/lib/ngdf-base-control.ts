import { Directive, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive()
export class NgdfBaseControl {
  protected readonly formGroup = inject(ControlContainer).control;
}

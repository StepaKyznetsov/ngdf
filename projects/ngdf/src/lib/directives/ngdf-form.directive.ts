import { Directive, inject, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { NgdfFormBuilder } from '../ngdf-form-builder';
import { DynamicFormConfig } from '../types';

/**
 *
 */
@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  providers: [
    { provide: FormGroupDirective, useExisting: NgdfFormDirective },
    { provide: ControlContainer, useExisting: NgdfFormDirective },
  ],
  exportAs: 'ngdfForm',
})
export class NgdfFormDirective extends FormGroupDirective {
  private readonly ngdfFormBuilder = inject(NgdfFormBuilder);
  /**
   *
   */
  @Input()
  set ngdfForm(formConfig: DynamicFormConfig) {
    this.form = this.ngdfFormBuilder.buildGroup(formConfig);
  }
}

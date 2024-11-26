import {
  Directive,
  ExistingProvider,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { NgdfFormBuilder } from '../ngdf-form-builder';
import { NgdfFormGroupConfig } from '../types/config';
import { NgdfFormGroup } from '../types/controls';

const ngdfFormDirectiveBinding: ExistingProvider[] = [
  {
    provide: FormGroupDirective,
    useExisting: forwardRef(() => NgdfFormDirective),
  },
  {
    provide: ControlContainer,
    useExisting: forwardRef(() => NgdfFormDirective),
  },
];

/**
 *
 */
@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  providers: [ngdfFormDirectiveBinding],
  exportAs: 'ngdfForm',
})
export class NgdfFormDirective extends FormGroupDirective {
  private readonly ngdfFormBuilder = inject(NgdfFormBuilder);

  @Input()
  set ngdfForm(formConfig: NgdfFormGroupConfig) {
    this.form = this.ngdfFormBuilder.group(formConfig);
  }

  get ngdfForm(): NgdfFormGroup {
    return this.form as NgdfFormGroup;
  }
}

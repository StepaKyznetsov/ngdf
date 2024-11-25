import {
  Directive,
  ExistingProvider,
  forwardRef,
  inject,
  Input,
  Type,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { NgdfFormBuilder } from '../ngdf-form-builder';
import { NgdfFormGroupConfig } from '../types/config';
import { NgdfFormGroup } from '../types/controls';

const useExisting: Type<NgdfFormDirective> = forwardRef(
  () => NgdfFormDirective,
);

const ngdfFormDirectiveProviders: ExistingProvider[] = [
  {
    provide: FormGroupDirective,
    useExisting,
  },
  {
    provide: ControlContainer,
    useExisting,
  },
];

/**
 *
 */
@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  providers: [ngdfFormDirectiveProviders],
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

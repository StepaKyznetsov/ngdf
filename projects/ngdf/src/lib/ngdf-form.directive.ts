import {
  Directive,
  forwardRef,
  inject,
  Input,
  Provider,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { catchError, from, Observable, of } from 'rxjs';
import { NgdfFormBuilder } from './ngdf-form-builder';
import { DYNAMIC_CONTROLS } from './providers';
import { DynamicControlType, DynamicFormConfig, NgdfControl } from './types';

const ngdfFormDirectiveProvider: Provider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupDirective),
};

@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  providers: [
    { provide: FormGroupDirective, useExisting: NgdfFormDirective },
    ngdfFormDirectiveProvider,
  ],
  exportAs: 'ngdfForm',
})
export class NgdfFormDirective extends FormGroupDirective {
  private readonly ngdfFormBuilder = inject(NgdfFormBuilder);
  private readonly vcr = inject(ViewContainerRef);
  private readonly dynamicControls = inject(DYNAMIC_CONTROLS);

  @Input()
  set ngdfForm(config: DynamicFormConfig) {
    this.form = this.ngdfFormBuilder.buildGroup(config);
  }

  // createForm(config: DynamicFormConfig): void {}

  fetchControl(
    type: DynamicControlType,
  ): Observable<Type<NgdfControl> | string> {
    return from(this.dynamicControls.get(type)!()).pipe(
      catchError(() =>
        of(`Control ${type} isn't registered in DYNAMIC_CONTROLS token`),
      ),
    );
  }
}

import {
  Directive,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NgdfFormBuilder } from './ngdf-form-builder';
import { DynamicFormConfig } from './types/config';

@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  exportAs: 'ngdfForm',
})
export class NgdfFormDirective implements OnChanges, OnDestroy {
  private readonly ngdfFormBuilder = inject(NgdfFormBuilder);

  readonly ngdfForm = input<DynamicFormConfig | null>(null);
  readonly valueChange = output<Record<string, unknown>>();

  private destroyForm = new Subject<void>();
  protected formGroup: FormGroup | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.needToReCreateForm(changes)) {
      return;
    }

    if (this.ngdfForm()) {
      this.destroy();
      this.destroyForm = new Subject<void>();
    }

    this.formGroup = this.ngdfFormBuilder.buildGroup({ controls: {} });

    this.formGroup.valueChanges
      .pipe(
        tap((value) => this.valueChange.emit(value)),
        takeUntil(this.destroyForm),
      )
      .subscribe();
  }

  private needToReCreateForm(changes: SimpleChanges): boolean {
    return Boolean(changes['ngdfForm']);
  }

  private destroy(): void {
    this.destroyForm.next();
    this.destroyForm.complete();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}

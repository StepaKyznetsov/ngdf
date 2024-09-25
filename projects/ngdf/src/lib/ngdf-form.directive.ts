import {
  DestroyRef,
  Directive,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { NgdfFormBuilder } from './ngdf-form-builder';
import { DynamicFormConfig } from './types/config';

@Directive({
  selector:
    'form[ngdfForm]:not([formGroup]):not([ngForm]):not(ng-form):not([ngNoForm])',
  standalone: true,
  exportAs: 'ngdfForm',
})
export class NgdfFormDirective implements OnInit, OnChanges {
  private readonly ngdfFormBuilder = inject(NgdfFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly ngdfForm = input<DynamicFormConfig | null>(null);
  readonly valueChange = output<Record<string, unknown>>();

  protected formGroup: FormGroup | null = null;

  ngOnInit(): void {
    this.formGroup = this.ngdfFormBuilder.buildForm({});

    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.valueChange.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.needToReCreateForm(changes)) {
      return;
    }
  }

  private needToReCreateForm(changes: SimpleChanges): boolean {
    return Boolean(changes['ngdfForm']);
  }
}

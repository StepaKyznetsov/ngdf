import { AsyncPipe, KeyValuePipe, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { NgdfFormDirective } from '../directives/ngdf-form.directive';
import { NgdfControlResolver } from '../ngdf-control-resolver';
import { NgdfFormGroupConfig } from '../types/config';
import { NgdfFormGroup } from '../types/controls';

/**
 * Key component of the "ngdf" library
 */
@Component({
  selector: 'ngdf-form',
  standalone: true,
  templateUrl: './ngdf-form.component.html',
  imports: [NgdfFormDirective, NgComponentOutlet, AsyncPipe, KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdfFormComponent {
  protected readonly ngdfControlResolver = inject(NgdfControlResolver);

  readonly config = input.required<NgdfFormGroupConfig>();
  private readonly form = viewChild(NgdfFormDirective);

  getForm(): NgdfFormGroup | undefined {
    return this.form?.()?.ngdfForm;
  }
}

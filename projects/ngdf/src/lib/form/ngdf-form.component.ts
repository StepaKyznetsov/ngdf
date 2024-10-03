import { AsyncPipe, KeyValuePipe, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgdfControlResolver } from '../ngdf-control-resolver';
import { NgdfFormDirective } from '../ngdf-form.directive';
import { NgdfControlInjectorPipe } from '../pipes/ngdf-control-injector.pipe';
import { DynamicFormConfig } from '../types';

/**
 * 
 */
@Component({
  selector: 'ngdf-form',
  standalone: true,
  templateUrl: './ngdf-form.component.html',
  imports: [
    NgdfFormDirective,
    NgdfControlInjectorPipe,
    NgComponentOutlet,
    AsyncPipe,
    KeyValuePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdfFormComponent {
  protected readonly ngdfControlResolver = inject(NgdfControlResolver);
  readonly config = input.required<DynamicFormConfig>();
}

import {
  AsyncPipe,
  KeyValuePipe,
  // NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgComponentOutlet } from '../directives/ng_component_outlet';
import { NgdfFormDirective } from '../directives/ngdf-form.directive';
import { NgdfControlResolver } from '../ngdf-control-resolver';
import { DynamicFormConfig } from '../types';

/**
 * Key component of the "ngdf" library
 */
@Component({
  selector: 'ngdf-form',
  standalone: true,
  templateUrl: './ngdf-form.component.html',
  imports: [
    NgdfFormDirective,
    NgComponentOutlet,
    NgTemplateOutlet,
    AsyncPipe,
    KeyValuePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdfFormComponent {
  protected readonly ngdfControlResolver = inject(NgdfControlResolver);
  readonly config = input.required<DynamicFormConfig>();

  readonly outputs: { [key: string]: (arg?: unknown) => unknown } = {
    value: (value: unknown) => {
      console.log(value);
    },
  };
}

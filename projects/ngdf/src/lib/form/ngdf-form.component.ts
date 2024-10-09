import {
  AsyncPipe,
  KeyValuePipe,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgdfFormDirective } from '../directives/ngdf-form.directive';
import { NgdfFormGroupConfig } from '../model/config';
import { NgdfControlResolver } from '../ngdf-control-resolver';

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
  readonly config = input.required<NgdfFormGroupConfig>();
}

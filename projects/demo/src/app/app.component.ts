import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgdfFormComponent,
  NgdfFormDirective,
  NgdfFormGroupConfig,
} from 'ngdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgdfFormDirective, NgdfFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly a = signal<string>('123');

  readonly b = {
    disabled: computed(() => this.a()),
  };

  readonly config: NgdfFormGroupConfig = {
    validators: {},
    type: 'group',
    controls: {
      email: {
        value: '2',
        label: 'test',
        type: 'text',
        validators: {
          required: true,
        },
      },
      phone: {
        value: '896444434',
        type: 'text',
        validators: {
          required: true,
        },
      },
    },
  };
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, NgdfFormComponent, NgdfFormDirective } from 'ngdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgdfFormDirective, NgdfFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly config: DynamicFormConfig = {
    validators: {},
    type: 'group',
    controls: {
      email: {
        value: '2',
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

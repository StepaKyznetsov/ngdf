import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DYNAMIC_CONTROLS, DynamicFormConfig, NgdfFormDirective } from 'ngdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgdfFormDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly ngdfControls = inject(DYNAMIC_CONTROLS);

  constructor() {
    this.ngdfControls.get('text')
  }

  private readonly ngdf = viewChild(NgdfFormDirective);

  readonly config: DynamicFormConfig = {
    validators: {},
    controls: {
      email: {
        value: '2',
        validators: {
          required: true,
        },
      },
    },
  };
}

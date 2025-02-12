import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgdfFormComponent, NgdfFormGroupConfig } from 'ngdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgdfFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  private readonly formComponent = viewChild(NgdfFormComponent);

  ngAfterViewInit(): void {
    this.formComponent()
      ?.getForm()
      ?.connection('hidden', [], [])
      .connection('formReset', [], []);
  }

  readonly config: NgdfFormGroupConfig = {
    key: 'group',
    type: 'group',
    controls: [
      {
        key: 'qwe',
        value: '2',
        label: 'test',
        type: 'text',
        validators: {
          required: true,
        },
      },
      {
        key: '456',
        value: '896444434',
        type: 'text',
      },
      {
        key: 'tsre',
        value: '896444434',
        type: 'text',
      },
    ],
  };
}

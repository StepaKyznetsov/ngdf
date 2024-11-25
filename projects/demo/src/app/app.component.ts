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
    this.formComponent()?.getForm()?.enableEventWatching();
  }

  readonly config: NgdfFormGroupConfig = {
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
        // validators: [
        //   {
        //     key: 'required',
        //   },
        // ],
      },
    },
  };
}

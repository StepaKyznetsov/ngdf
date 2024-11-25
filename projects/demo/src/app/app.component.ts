import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgdfFormComponent, NgdfFormDirective, NgdfFormGroupConfig } from 'ngdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgdfFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  private readonly a = signal<string>('123');

  private readonly form = viewChild(NgdfFormDirective);

  ngAfterViewInit(): void {
    console.log(this.form())
  }

  readonly b = {
    disabled: computed(() => this.a()),
  };

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

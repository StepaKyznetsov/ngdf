import { AfterViewInit, Component, output, viewChild } from '@angular/core';
import {
  ControlContainer,
  FormControlName,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgdfBaseControl } from 'ngdf';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class InputComponent extends NgdfBaseControl implements AfterViewInit {
  readonly controlRef = viewChild(FormControlName);

  readonly value = output<string>();

  ngAfterViewInit(): void {
    this.controlRef()?.valueChanges?.subscribe((value) => {
      this.value.emit(value);
    });
  }
}

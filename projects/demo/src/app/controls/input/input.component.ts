import { Component, output, viewChild } from '@angular/core';
import {
  ControlContainer,
  FormControlName,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
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
export class InputComponent extends NgdfBaseControl {
  readonly controlRef = viewChild(FormControlName);

  readonly value = output<string>();

  click() {
    this.controlConfig.update((prev) => ({
      ...prev,
      label: '',
      validators: { ...prev.validators, required: false },
    }));
    this.controlRef()?.control.removeValidators(Validators.required);
    this.controlRef()?.control.updateValueAndValidity();
  }
}

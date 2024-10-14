import { JsonPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
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
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class InputComponent extends NgdfBaseControl {
  protected readonly controlRef = viewChild(FormControlName);
 
  click() {
    this.controlConfig.update((prev) => ({
      ...prev,
      label: '',
      // validators: [...(prev.validators || []), { key: 'required' }],
    }));
    this.controlRef()?.control.removeValidators(Validators.required);
    this.controlRef()?.control.updateValueAndValidity();
  }
}

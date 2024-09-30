import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgdfBaseControl, NgdfControl } from 'ngdf';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends NgdfBaseControl implements NgdfControl {
  control?: FormControl<unknown> | undefined;
  setProps(): void {
    throw new Error('Method not implemented.');
  }
  setValue(): void {
    throw new Error('Method not implemented.');
  }
  resetValue?(): void {
    throw new Error('Method not implemented.');
  }
  addValidators?(): void {
    throw new Error('Method not implemented.');
  }
}

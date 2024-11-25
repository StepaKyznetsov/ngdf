import { JsonPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { FormControlName, ReactiveFormsModule } from '@angular/forms';
import { NgdfBaseControl, ngdfViewProviders } from 'ngdf';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [ngdfViewProviders],
})
export class InputComponent extends NgdfBaseControl {
  protected readonly controlRef = viewChild(FormControlName);
}

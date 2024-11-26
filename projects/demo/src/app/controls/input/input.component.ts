import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgdfBaseControl, ngdfControlBinding } from 'ngdf';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [ngdfControlBinding],
})
export class InputComponent extends NgdfBaseControl {}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NGDF_CONTROL, NgdfBaseControl } from 'ngdf';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends NgdfBaseControl {
  readonly ngdfControl = inject(NGDF_CONTROL);
}

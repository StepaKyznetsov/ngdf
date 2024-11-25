import { Directive, input, model } from '@angular/core';
import { NgdfAbstractControlConfig, NgdfFormControlConfig } from './types/config';

/**
 *
 * Base class for all dynamic controls / groups / arrays.
 * Custom control should extend the NgdfBaseControl class.
 * ```ts
 * import { NgdfBaseControl } from 'ngdf'
 *
 * @Component({...})
 * export class CustomInputComponent extends NgdfBaseControl {...}
 * ```
 */
@Directive({
  host: {
    class: 'ngdf-control',
  },
})
export class NgdfBaseControl<
  T extends NgdfAbstractControlConfig = NgdfFormControlConfig<string>,
> {
  protected readonly controlKey = input.required<string>();
  protected readonly controlConfig = model.required<T>();
}

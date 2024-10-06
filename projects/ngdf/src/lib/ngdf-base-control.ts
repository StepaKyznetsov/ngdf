import { KeyValue } from '@angular/common';
import { Directive, input } from '@angular/core';
import { DynamicControlConfig } from './types';

/**
 * Base class for all dynamic controls / groups / arrays.
 *
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
export class NgdfBaseControl {
  readonly control =
    input.required<KeyValue<string, DynamicControlConfig<string>>>();
}

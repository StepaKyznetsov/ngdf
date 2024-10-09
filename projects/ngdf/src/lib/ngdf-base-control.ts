import { Directive, effect, inject, input, model } from '@angular/core';
import {
  NgdfAbstractControlConfig,
  NgdfFormControlConfig,
} from './model/config';
import { NgdfDependenciesController } from './ngdf-dependencies-controller';

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
  private readonly ngdfDependenciesController = inject(
    NgdfDependenciesController,
  );

  readonly controlKey = input.required<string>();
  readonly controlConfig = model.required<T>();

  constructor() {
    effect(() => {
      this.ngdfDependenciesController.triggerDependency(this.controlConfig());
    });
  }
}

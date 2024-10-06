import { INJECTOR, Injector, Pipe, PipeTransform, inject } from '@angular/core';
import { NGDF_CONTROL } from '../providers';
import {
  DynamicArrayControlConfig,
  DynamicControlConfig,
  DynamicFormConfig,
} from '../types';

/**
 * Setting personal NGDF_CONTROL provider with name and config for every dynamic control
 * @deprecated
 */
@Pipe({
  name: 'ngdfControlInjector',
  standalone: true,
})
export class NgdfControlInjectorPipe implements PipeTransform {
  private readonly injector = inject(INJECTOR);

  transform(
    controlName: string,
    controlConfig:
      | DynamicFormConfig
      | DynamicControlConfig
      | DynamicArrayControlConfig,
  ): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: NGDF_CONTROL, useValue: { controlName, controlConfig } },
      ],
    });
  }
}

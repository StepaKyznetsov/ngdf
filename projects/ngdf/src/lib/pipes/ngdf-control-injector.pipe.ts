import { INJECTOR, Injector, Pipe, PipeTransform, inject } from '@angular/core';
import { NgdfControlConfig } from '../model';
import { NGDF_CONTROL } from '../providers';

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

  transform(controlName: string, controlConfig: NgdfControlConfig): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: NGDF_CONTROL, useValue: { controlName, controlConfig } },
      ],
    });
  }
}

import { inject, Injectable, Type } from '@angular/core';
import { from, Observable, of, tap } from 'rxjs';
import { NgdfControlType } from './model/config';
import { NgdfBaseControl } from './ngdf-base-control';
import { NGDF_DYNAMIC_CONTROLS } from './providers';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class NgdfControlResolver {
  private readonly dynamicControls = inject(NGDF_DYNAMIC_CONTROLS);

  /**
   *
   */
  private readonly controls = new Map<string, Type<NgdfBaseControl>>();

  /**
   *
   * @param type
   * @returns
   */
  resolve(type: NgdfControlType): Observable<Type<NgdfBaseControl>> {
    if (!this.controls.has(type)) {
      if (!this.dynamicControls.get(type)) {
        throw new Error(
          `Control type "${type}" isn't registered in NGDF_DYNAMIC_CONTROLS token 
            (check provideDynamicControls in your app config)
          `,
        );
      }

      return from(this.dynamicControls.get(type)!()).pipe(
        tap((control) => this.controls.set(type, control)),
      );
    }

    return of(this.controls.get(type)!);
  }
}

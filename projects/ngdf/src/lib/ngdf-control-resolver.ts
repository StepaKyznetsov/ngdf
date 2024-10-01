import { inject, Injectable, Type } from '@angular/core';
import { catchError, from, Observable, throwError } from 'rxjs';
import { NgdfBaseControl } from './ngdf-base-control';
import { NGDF_DYNAMIC_CONTROLS } from './providers';
import { DynamicControlType } from './types';

@Injectable({
  providedIn: 'root',
})
export class NgdfControlResolver {
  private readonly dynamicControls = inject(NGDF_DYNAMIC_CONTROLS);

  resolve(type: DynamicControlType): Observable<Type<NgdfBaseControl>> {
    return from(this.dynamicControls.get(type)!()).pipe(
      catchError((e) => {
        console.error(
          `Control type "${type}" isn't registered in DYNAMIC_CONTROLS token 
          (check provideDynamicControls in your app config)
          `,
        );
        return throwError(() => e);
      }),
    );
  }
}

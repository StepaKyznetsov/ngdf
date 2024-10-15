import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgdfDependenciesController {
  triggerDependency(a: unknown) {
    console.log(a);
  }
}

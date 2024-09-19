import { InjectionToken } from '@angular/core';
import { Control } from '../types/controls';

export const NGDF_CONTROL = new InjectionToken<ReadonlyArray<Control>>(
  'Array of registered controls',
);

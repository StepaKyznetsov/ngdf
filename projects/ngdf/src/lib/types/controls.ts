import { Type } from '@angular/core';
import { NgdfBaseControl } from '../ngdf-base-control';
import { DynamicAbstractControlConfig, DynamicControlConfig } from './config';

export interface NgdfControl<
  T extends DynamicAbstractControlConfig = DynamicControlConfig,
> {
  controlName: string;
  controlConfig: T;
}

export type NgdfControlLoaderFn = () => Promise<Type<NgdfBaseControl>>;

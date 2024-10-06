import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { NgdfBaseControl } from './ngdf-base-control';
import { NgdfControlLoaderFn } from './types';
import { DynamicControlType } from './types/config';

/**
 * Name and config of ngdf control component
 * 
 * @deprecated
 */
export const NGDF_CONTROL = new InjectionToken<NgdfBaseControl>(
  'ngdf control data',
);

/**
 * Array of registered dynamic components
 */
export const NGDF_DYNAMIC_CONTROLS = new InjectionToken<
  ReadonlyMap<DynamicControlType, NgdfControlLoaderFn>
>('Array of registered components for control types');

/**
 * Environment provider for registering dynamic components
 * @param controls array of tuples: [control type, component]
 * @returns
 */
export const provideNgdfDynamicControls = (controls: {
  [key in DynamicControlType]?: NgdfControlLoaderFn;
}): EnvironmentProviders => {
  const controlMap = new Map<DynamicControlType, NgdfControlLoaderFn>();
  Object.entries(controls).forEach(([type, control]) =>
    controlMap.set(type as DynamicControlType, control),
  );

  return makeEnvironmentProviders([
    {
      provide: NGDF_DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { NgdfControl, NgdfControlLoaderFn } from './types';
import { DynamicControlType } from './types/config';

/**
 * Name and config of ngdf control component
 */
export const NGDF_CONTROL = new InjectionToken<NgdfControl>(
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
export const provideNgdfDynamicControls = (
  controls: [DynamicControlType, NgdfControlLoaderFn][],
): EnvironmentProviders => {
  const controlMap = new Map<DynamicControlType, NgdfControlLoaderFn>();
  controls.forEach((c) => controlMap.set(c[0], c[1]));

  return makeEnvironmentProviders([
    {
      provide: NGDF_DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

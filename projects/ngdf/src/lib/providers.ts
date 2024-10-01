import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { LazyNgdfControl, NgdfControl } from './types';
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
  ReadonlyMap<DynamicControlType, LazyNgdfControl>
>('Array of registered components for control types');

/**
 * Environment provider for registering dynamic components
 * @param controls array of tuples: [control type, component]
 * @returns
 */
export const provideNgdfDynamicControls = (
  controls: [DynamicControlType, LazyNgdfControl][],
): EnvironmentProviders => {
  const controlMap = new Map<DynamicControlType, LazyNgdfControl>();
  controls.forEach((c) => controlMap.set(c[0], c[1]));

  return makeEnvironmentProviders([
    {
      provide: NGDF_DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { LazyNgdfControl } from './types';
import { DynamicControlType } from './types/config';

/**
 * Array of registered dynamic components
 */
export const DYNAMIC_CONTROLS = new InjectionToken<
  ReadonlyMap<DynamicControlType, LazyNgdfControl>
>('Array of registered components for control types');

/**
 * Environment provider for registering dynamic components
 * @param controls array of tuples: [control type, component]
 * @returns
 */
export const provideDynamicControls = (
  controls: [DynamicControlType, LazyNgdfControl][],
): EnvironmentProviders => {
  const controlMap = new Map<DynamicControlType, LazyNgdfControl>();
  controls.forEach((c) => controlMap.set(c[0], c[1]));

  return makeEnvironmentProviders([
    {
      provide: DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

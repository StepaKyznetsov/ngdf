import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders,
} from '@angular/core';
import { DynamicControlType } from './types/config';

/**
 * Array of registered dynamic components
 */
export const DYNAMIC_CONTROLS = new InjectionToken<
  ReadonlyMap<DynamicControlType, unknown>
>('Array of registered components for control types');

/**
 * Environment provider for registering dynamic components
 * @param controls array of tuples: [control type, component]
 * @returns
 */
export const provideDynamicControls = (
  controls: [DynamicControlType, (() => Promise<unknown>) | unknown][],
): EnvironmentProviders => {
  const controlMap = new Map<DynamicControlType, unknown>();
  controls.forEach((c) => controlMap.set(c[0], c[1]));

  return makeEnvironmentProviders([
    {
      provide: DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

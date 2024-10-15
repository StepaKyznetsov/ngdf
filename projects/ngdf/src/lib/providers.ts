import { InjectionToken, Provider } from '@angular/core';
import { NgdfControlLoaderFn, NgdfControlType } from './model';

/**
 * Array of registered dynamic components
 */
export const NGDF_DYNAMIC_CONTROLS = new InjectionToken<
  ReadonlyMap<NgdfControlType, NgdfControlLoaderFn>
>('Array of registered components for control types');

/**
 * Environment provider for registering dynamic components
 * @param controls array of tuples: [control type, component]
 * @returns
 */
export const provideNgdfDynamicControls = (controls: {
  [key in NgdfControlType]?: NgdfControlLoaderFn;
}): Provider => {
  const controlMap = new Map<NgdfControlType, NgdfControlLoaderFn>();
  Object.entries(controls).forEach(([type, control]) =>
    controlMap.set(type as NgdfControlType, control),
  );

  return {
    provide: NGDF_DYNAMIC_CONTROLS,
    useValue: controlMap,
  };
};

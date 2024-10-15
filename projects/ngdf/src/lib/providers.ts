import { InjectionToken, Provider } from '@angular/core';
import { NgdfControlType } from './model/config';
import { NgdfControlLoaderFn } from './model/controls';
import { NgdfBaseControl } from './ngdf-base-control';

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

import { InjectionToken, Provider } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { NgdfControlLoaderFn, NgdfControlType } from './types';

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
export const provideNgdfDynamicControls = (
  controls: Partial<Record<NgdfControlType, NgdfControlLoaderFn>>,
): Provider => {
  const controlMap = new Map<NgdfControlType, NgdfControlLoaderFn>();
  Object.entries(controls).forEach(([type, control]) =>
    controlMap.set(type as NgdfControlType, control),
  );

  return {
    provide: NGDF_DYNAMIC_CONTROLS,
    useValue: controlMap,
  };
};

export const ngdfViewProviders = [
  { provide: ControlContainer, useExisting: FormGroupDirective },
];

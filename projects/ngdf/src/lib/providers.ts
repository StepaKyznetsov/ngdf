import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { NgdfControlType } from './types/config';
import { NgdfControlLoaderFn } from './types/controls';
import { typedEntries } from './utils/typed-entries';

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
): EnvironmentProviders => {
  const controlMap = new Map<NgdfControlType, NgdfControlLoaderFn>();
  typedEntries<NgdfControlType, NgdfControlLoaderFn>(controls).forEach(
    ([type, control]) => controlMap.set(type, control),
  );

  return makeEnvironmentProviders([
    {
      provide: NGDF_DYNAMIC_CONTROLS,
      useValue: controlMap,
    },
  ]);
};

export const ngdfControlProviders: Provider[] = [
  { provide: ControlContainer, useExisting: FormGroupDirective },
];

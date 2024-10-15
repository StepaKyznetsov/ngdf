import { NgdfFormControlConfig } from './config';

export type DefaultDependencyMode = 'copy';

export type ValueFromDependencyMode = 'value-from' | 'value-from-invert';

interface ValueFromDependencyModeData {
  mode: ValueFromDependencyMode;
  fromObject: object;
}

export type BooleanDependencyMode = 'boolean' | 'boolean-invert';

export type DependencyMode =
  | DefaultDependencyMode
  | ValueFromDependencyMode
  | BooleanDependencyMode;

export interface BaseDependencyModeData {
  mode: Exclude<DependencyMode, ValueFromDependencyMode>;
}

export type DependentProperty = keyof NgdfFormControlConfig;

export type FieldDependency = {
  observedProp: DependentProperty;
} & ValueFromDependencyModeData;

export interface A {
  t(): void;
}

export type ValueConverterFn = <T, U extends DependencyMode>(
  value: T,
) => U extends DefaultDependencyMode ? T : boolean;

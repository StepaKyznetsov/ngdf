import { NgdfFormControlConfig } from './config';

export type DependencyMode = 'copy' | 'invert' | 'expression';

export type DependentProperty = keyof NgdfFormControlConfig;

export interface FieldDependency {
  mode: DependencyMode;
  dependentProperty: DependentProperty;
}

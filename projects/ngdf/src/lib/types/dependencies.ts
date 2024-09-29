import { DynamicControlConfig } from './config';

export type DependencyMode = 'copy' | 'invert' | 'expression';

export type DependentProperty = keyof DynamicControlConfig;

export interface FieldDependency {
  mode: DependencyMode;
  dependentProperty: DependentProperty;
}

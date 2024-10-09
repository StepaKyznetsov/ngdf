import { NgdfFormControlConfig } from './config';

type DefaultDependencyMode = 'boolean' | 'boolean-invert' | 'copy';

interface DefaultModeDependency {
  mode: DefaultDependencyMode;
}

type ValueFromDependencyMode = 'value-from' | 'value-from-invert';

interface ValueFromModeDependency {
  mode: ValueFromDependencyMode;
  fromObject: object;
}

export type DependentProperty = keyof NgdfFormControlConfig;

export type FieldDependency = {
  observedProp: DependentProperty;
} & (DefaultModeDependency | ValueFromModeDependency);

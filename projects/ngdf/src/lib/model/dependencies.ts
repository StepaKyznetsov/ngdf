import { NgdfFormControlConfig, ValidatorKey } from './config';

export type CopyDependencyMode = 'copy';

export type ValueFromDependencyMode = 'valueFrom' | 'valueFromInvert';

interface ValueFromDependencyModeData {
  fromObject: object;
}

export type BooleanDependencyMode = 'boolean' | 'booleanInvert';

export type ConstDependencyMode =
  | 'toValue'
  | 'toNull'
  | 'toEmptyString'
  | 'toTrue'
  | 'toFalse';

export interface ConstDependencyModeData<T = unknown> {
  value: T;
}

export type DependencyMode =
  | CopyDependencyMode
  | ValueFromDependencyMode
  | BooleanDependencyMode
  | ConstDependencyMode;

export interface BaseDependencyModeData {
  mode: Exclude<DependencyMode, ValueFromDependencyMode>;
}

export type ChangeableProperty =
  | Exclude<keyof NgdfFormControlConfig, 'validators' | 'type'>
  | ValidatorKey;

export interface ObservedControl {
  key: string;
  property: ChangeableProperty;
}

export type CrossControlDependency<T extends DependencyMode> = {
  observedControl: ObservedControl;
  dependentProperty: ChangeableProperty;
  mode: T;
} & T extends 'toValue'
  ? ConstDependencyModeData
  : T extends ValueFromDependencyMode
    ? ValueFromDependencyModeData
    : never;

export type ValueConverterFn = <T extends DependencyMode, U = unknown>(
  value?: U,
) => T extends CopyDependencyMode | 'toValue'
  ? U
  : T extends 'toNull'
    ? null
    : T extends 'toEmptyString'
      ? string
      : boolean;

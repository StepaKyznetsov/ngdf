import { AbstractControl, FormGroup } from '@angular/forms';
import { NgdfFormControlConfig, ValidatorKey } from './config';

export type CopyDependencyMode = 'copy';

export type ValueFromDependencyMode = 'valueFrom' | 'valueFromInvert';

// interface ValueFromDependencyModeData {
//   fromObject: object;
// }

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

export type ComparisonDependencyMode = 'equal' | 'more' | 'less';

export type StatusDependencyMode =
  | 'touched'
  | 'pristine'
  | 'valid'
  | 'invalid'
  | 'pending'
  | 'dirty'
  | 'untouched';

export type DependencyMode =
  | CopyDependencyMode
  | ValueFromDependencyMode
  | BooleanDependencyMode
  | ConstDependencyMode
  | ComparisonDependencyMode
  | StatusDependencyMode;

export interface BaseDependencyModeData {
  mode: Exclude<DependencyMode, ValueFromDependencyMode>;
}

export type ChangeableProperty =
  | Exclude<keyof NgdfFormControlConfig, 'validators' | 'type'>
  | ValidatorKey;

export interface DependentControl {
  key: string;
  property: ChangeableProperty;
}

export type CrossControlDependency<T extends DependencyMode = DependencyMode> =
  {
    control: DependentControl;
    mode: T;
  };
// & T extends 'toValue'
//   ? ConstDependencyModeData
//   : T extends ValueFromDependencyMode
//     ? ValueFromDependencyModeData
//     : never;

export type ValueConverterFn = <T extends DependencyMode, U = unknown>(
  value?: U,
) => T extends CopyDependencyMode | 'toValue'
  ? U
  : T extends 'toNull'
    ? null
    : T extends 'toEmptyString'
      ? string
      : boolean;

export interface WithDependencies {
  setDependentControls(
    formGroup: FormGroup,
    dependencies: CrossControlDependency[],
  ): void;
  clearDependentControls(): void;
}

export type ControlWithDependencies<T extends AbstractControl> = T &
  WithDependencies;

import { AbstractControl, ControlEvent } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgdfFormControlConfig, ValidatorKey } from './config';
import { NgdfAbstractControl } from './controls';
import { NgdfEventKey } from './events';

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

export type ComparisonDependencyMode =
  | 'equal'
  | 'nonEqual'
  | 'more'
  | 'moreOrEqual'
  | 'less'
  | 'lesssOrEqual';

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

// export interface BaseDependencyModeData {
//   mode: Exclude<DependencyMode, ValueFromDependencyMode>;
// }

export type ChangeableProperty =
  | Exclude<
      keyof NgdfFormControlConfig,
      'validators' | 'type' | 'dependentControls'
    >
  | ValidatorKey;

export interface DependentControl {
  key: string;
  property: ChangeableProperty;
}

interface _CrossControlDependency<T extends DependencyMode> {
  control: DependentControl;
  mode: T;
}

export interface ConstCrossControlDependency<
  T extends ConstDependencyMode = ConstDependencyMode,
  U = unknown,
> extends _CrossControlDependency<T> {
  value: U;
}

export interface ValueFromControlDependency<
  T extends ValueFromDependencyMode = ValueFromDependencyMode,
  U extends object = object,
> extends _CrossControlDependency<T> {
  fromObject: U;
}

export type BaseControlDependency<T extends DependencyMode = DependencyMode> =
  _CrossControlDependency<T>;

export type CrossControlDependency<T extends DependencyMode = DependencyMode> =
  T extends ConstDependencyMode
    ? ConstCrossControlDependency<T>
    : T extends ValueFromDependencyMode
      ? ValueFromControlDependency<T>
      : BaseControlDependency<T>;

export type ValueConverterFn = <T extends DependencyMode, U = unknown>(
  value?: U,
) => T extends CopyDependencyMode | 'toValue'
  ? U
  : T extends 'toNull'
    ? null
    : T extends 'toEmptyString'
      ? string
      : boolean;

export interface WithNgdf {
  connection(
    prop: NgdfEventKey,
    dependentControls: NgdfAbstractControl[],
    converters: NgdfConverterFn[],
  ): this;
  openConnections(): void;
  closeConnections(): void;
  ngdfEvents: Observable<ControlEvent>;
  hidden: boolean;
  setHidden(
    hidden: boolean,
    opts?: { sourceControl?: NgdfAbstractControl },
  ): void;
}

export type NgdfControl<T extends AbstractControl> = T & WithNgdf;

export type NgdfEventHandlerFn<T extends ControlEvent> = (event: T) => void;

export type NgdfConverterFn<
  T extends ControlEvent = ControlEvent,
  U extends any[] = any[],
> = (
  event: T,
  dependentControls: NgdfAbstractControl[],
  prop: NgdfEventKey,
  ...args: U
) => void;

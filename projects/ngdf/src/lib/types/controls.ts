import { Type } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgdfBaseControl } from '../ngdf-base-control';
import { NgdfControl } from './dependencies';

export type NgdfControlLoaderFn = () => Promise<Type<NgdfBaseControl>>;

export type NgdfAbstractControl<T extends AbstractControl = AbstractControl> =
  NgdfControl<T>;

export type NgdfFormControl<T = any> = NgdfAbstractControl<FormControl<T>>;

export type NgdfFormArray<T extends NgdfAbstractControl = any> =
  NgdfAbstractControl<FormArray<T>>;

export type NgdfFormGroup<
  T extends {
    [K in keyof T]: NgdfAbstractControl;
  } = any,
> = NgdfAbstractControl<FormGroup<T>>;

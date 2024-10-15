import { Type } from '@angular/core';
import { NgdfBaseControl } from '../ngdf-base-control';

export type NgdfControlLoaderFn = () => Promise<Type<NgdfBaseControl>>;

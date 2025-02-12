import { ControlEvent } from '@angular/forms';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { NgdfAbstractControl } from '../types/controls';
import { NgdfConverterFn } from '../types/dependencies';
import { NgdfEventKey, ngdfEventMap } from '../types/events';

export class NgdfConnection {
  private _currentControl!: NgdfAbstractControl;
  private _prop!: NgdfEventKey;
  private _dependentControls!: NgdfAbstractControl[];
  private _converters!: NgdfConverterFn[];

  private _closeConnection = new Subject<void>();

  get opened(): boolean {
    return !this._closeConnection.closed;
  }

  constructor(
    currentControl: NgdfAbstractControl,
    prop: NgdfEventKey,
    dependentControls: NgdfAbstractControl[],
    converters: NgdfConverterFn[],
  ) {
    this._currentControl = currentControl;
    this._prop = prop;
    this._dependentControls = dependentControls;
    this._converters = converters;
    this.open();
  }

  open(): void {
    if (this._closeConnection.closed) {
      this._closeConnection = new Subject<void>();
    }
    this._currentControl.ngdfEvents
      .pipe(
        filter((event) => event instanceof ngdfEventMap[this._prop]),
        tap((event) => this._convert(event)),
        takeUntil(this._closeConnection),
      )
      .subscribe();
  }

  close(): void {
    this._closeConnection.next();
    this._closeConnection.complete();
  }

  private _convert(event: ControlEvent): void {
    this._converters.forEach((converter) =>
      converter(event, this._dependentControls, this._prop),
    );
  }
}

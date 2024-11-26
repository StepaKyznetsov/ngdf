import { filter, Subject, takeUntil, tap } from 'rxjs';
import { NgdfAbstractControl } from '../types/controls';
import { NgdfEventKey, ngdfEventMap } from '../types/events';

export class NgdfConnection {
  private _currentControl!: NgdfAbstractControl;
  private _prop!: NgdfEventKey;
  private _dependentControls!: NgdfAbstractControl[];
  private _converters!: ((...args: any[]) => any)[];

  private readonly _closeConnection = new Subject<void>();

  constructor(
    currentControl: NgdfAbstractControl,
    prop: NgdfEventKey,
    dependentControls: NgdfAbstractControl[],
    converters: ((...args: any[]) => any)[],
  ) {
    this._currentControl = currentControl;
    this._prop = prop;
    this._dependentControls = dependentControls;
    this._converters = converters;
  }

  open(): void {
    this._currentControl.ngdfEvents
      .pipe(
        filter((event) => event instanceof ngdfEventMap[this._prop]),
        tap(() => this._convert()),
        takeUntil(this._closeConnection),
      )
      .subscribe();
  }

  close() {
    this._closeConnection.next();
    this._closeConnection.complete();
  }

  private _convert(): void {
    this._converters.reduce((_, converter) =>
      converter(this._currentControl, this._prop, this._dependentControls),
    );
  }
}

export function ngdfConnection(
  ...args: ConstructorParameters<typeof NgdfConnection>
): NgdfConnection {
  return new NgdfConnection(...args);
}

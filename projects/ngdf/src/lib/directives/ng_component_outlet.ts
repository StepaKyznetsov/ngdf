/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ComponentRef,
  createNgModule,
  Directive,
  DoCheck,
  EventEmitter,
  Injector,
  Input,
  NgModuleFactory,
  NgModuleRef,
  OnChanges,
  OnDestroy,
  OutputEmitterRef,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';

/**
 * This is an exact copy of the ngComponentOutlet {@link https://github.com/angular/angular/blob/main/packages/common/src/directives/ng_component_outlet.ts} directive,
 * but with the addition of outputs functionality from {@link https://github.com/JeanMeche/angular/commit/3fccae227e7abb13fdb5ac8a29b68664d108ade5#diff-cdf708a0e5e8c80937c8298edf9d0226f9cb40f766a9cab833f6e126e3c76075R123} that will soon
 * be added to Angular itself. At that time,
 * this directive will be removed and replaced with the original.
 */
@Directive({
  selector: '[ngComponentOutlet]',
  standalone: true,
})
export class NgComponentOutlet implements OnChanges, DoCheck, OnDestroy {
  @Input() ngComponentOutlet: Type<any> | null = null;

  @Input() ngComponentOutletInputs?: Record<string, unknown>;
  @Input() ngComponentOutletOutputs?: Record<
    string,
    (...args: any[]) => unknown
  >;
  @Input() ngComponentOutletInjector?: Injector;
  @Input() ngComponentOutletContent?: any[][];

  @Input() ngComponentOutletNgModule?: Type<any>;
  /**
   * @deprecated This input is deprecated, use `ngComponentOutletNgModule` instead.
   */
  @Input() ngComponentOutletNgModuleFactory?: NgModuleFactory<any>;

  private _componentRef: ComponentRef<any> | undefined;
  private _moduleRef: NgModuleRef<any> | undefined;

  /**
   * A helper data structure that allows us to track inputs that were part of the
   * ngComponentOutletInputs expression. Tracking inputs is necessary for proper removal of ones
   * that are no longer referenced.
   */
  private _inputsUsed = new Map<string, boolean>();
  private _outputsUsed = new Map<
    string,
    [(...args: any[]) => unknown, { unsubscribe: () => void } | null]
  >();

  constructor(private _viewContainerRef: ViewContainerRef) {}

  private _needToReCreateNgModuleInstance(changes: SimpleChanges): boolean {
    // Note: square brackets property accessor is safe for Closure compiler optimizations (the
    // `changes` argument of the `ngOnChanges` lifecycle hook retains the names of the fields that
    // were changed).
    return (
      changes['ngComponentOutletNgModule'] !== undefined ||
      changes['ngComponentOutletNgModuleFactory'] !== undefined
    );
  }

  private _needToReCreateComponentInstance(changes: SimpleChanges): boolean {
    // Note: square brackets property accessor is safe for Closure compiler optimizations (the
    // `changes` argument of the `ngOnChanges` lifecycle hook retains the names of the fields that
    // were changed).
    return (
      changes['ngComponentOutlet'] !== undefined ||
      changes['ngComponentOutletContent'] !== undefined ||
      changes['ngComponentOutletInjector'] !== undefined ||
      this._needToReCreateNgModuleInstance(changes)
    );
  }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges) {
    if (this._needToReCreateComponentInstance(changes)) {
      this._viewContainerRef.clear();
      this._inputsUsed.clear();
      this._componentRef = undefined;

      if (this.ngComponentOutlet) {
        const injector =
          this.ngComponentOutletInjector ||
          this._viewContainerRef.parentInjector;

        if (this._needToReCreateNgModuleInstance(changes)) {
          this._moduleRef?.destroy();

          if (this.ngComponentOutletNgModule) {
            this._moduleRef = createNgModule(
              this.ngComponentOutletNgModule,
              getParentInjector(injector),
            );
          } else if (this.ngComponentOutletNgModuleFactory) {
            this._moduleRef = this.ngComponentOutletNgModuleFactory.create(
              getParentInjector(injector),
            );
          } else {
            this._moduleRef = undefined;
          }
        }

        this._componentRef = this._viewContainerRef.createComponent(
          this.ngComponentOutlet,
          {
            injector,
            ngModuleRef: this._moduleRef,
            projectableNodes: this.ngComponentOutletContent,
          },
        );
      }
    }
  }

  /** @nodoc */
  ngDoCheck() {
    if (this._componentRef) {
      if (this.ngComponentOutletInputs) {
        for (const inputName of Object.keys(this.ngComponentOutletInputs)) {
          this._inputsUsed.set(inputName, true);
        }
      }

      this._applyInputStateDiff(this._componentRef);
      this._applyOutputs();
    }
  }

  /** @nodoc */
  ngOnDestroy() {
    this._moduleRef?.destroy();
    this._outputsUsed.forEach(([_, sub]) => sub?.unsubscribe());
  }

  private _applyInputStateDiff(componentRef: ComponentRef<unknown>) {
    for (const [inputName, touched] of this._inputsUsed) {
      if (!touched) {
        // The input that was previously active no longer exists and needs to be set to undefined.
        componentRef.setInput(inputName, undefined);
        this._inputsUsed.delete(inputName);
      } else {
        // Since touched is true, it can be asserted that the inputs object is not empty.
        componentRef.setInput(
          inputName,
          this.ngComponentOutletInputs![inputName],
        );
        this._inputsUsed.set(inputName, false);
      }
    }
  }

  private _applyOutputs() {
    const outputs = this.ngComponentOutletOutputs;
    this._outputsUsed.forEach(([_, sub], output) => {
      if (!outputs || !outputs[output]) {
        // Cancelling removed outputs
        sub?.unsubscribe();
      }
    });

    for (const [outputName, callback] of Object.entries(outputs ?? {})) {
      const [bindedCallback, sub] = this._outputsUsed.get(outputName) ?? [];
      if (bindedCallback == callback) {
        // The callback didn't change we don't need to do anything
        continue;
      }

      // Cancelling the previous output
      sub?.unsubscribe();

      const maybeEmitter = this._componentRef?.instance[outputName];
      if (
        maybeEmitter instanceof EventEmitter ||
        maybeEmitter instanceof OutputEmitterRef
      ) {
        const sub = maybeEmitter.subscribe(callback);
        this._outputsUsed.set(outputName, [callback, sub]);
      }
    }
  }
}

// Helper function that returns an Injector instance of a parent NgModule.
function getParentInjector(injector: Injector): Injector {
  const parentNgModule = injector.get(NgModuleRef);
  return parentNgModule.injector;
}

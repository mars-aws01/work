import {
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  NgZone,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { ComponentLoader } from './component-loader';

export class ComponentLoaderFactory {
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private ngZone: NgZone,
    private appRef: ApplicationRef
  ) {
  }

  createLoader<T>(elementRef: ElementRef, viewContainerRef: ViewContainerRef, renderer: Renderer2) {
    return new ComponentLoader(
      elementRef,
      viewContainerRef,
      renderer,
      this.injector,
      this.cfr,
      this.ngZone,
      this.appRef
    );
  }
}

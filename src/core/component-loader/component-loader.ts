import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  NgZone,
  Provider,
  ReflectiveInjector,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';

export class ComponentLoader<T>{

  public componentFactory: ComponentFactory<T>;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone,
    private applicationRef: ApplicationRef,
    // private _posService: PositioningService
  ) {

  }

  attach(componentType: Type<T>): ComponentLoader<T> {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    return this;
  }

  to(container?: string | HTMLElement): ComponentLoader<T> {
    
    return this;
  }
}

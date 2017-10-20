import { NgZone, TemplateRef, ViewContainerRef } from '@angular/core';
export class OverlayRef {
  private disposeFn: (() => void) | null;

  constructor(private hostElement: HTMLElement, private ngZone: NgZone) {

  }

  public attach(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>) {
    this.attachTemplatePortal(viewContainerRef, templateRef);
  }

  public detach(): any {
    this.disposeFn && this.disposeFn();
  }

  public dispose() {
    if (this.hostElement) {
      this.hostElement.remove();
    }
  }

  attachTemplatePortal<T>(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<T>) {
    let viewRef = viewContainerRef.createEmbeddedView(templateRef);
    viewRef.detectChanges();
    viewRef.rootNodes.forEach(rootNode => {
      this.hostElement.appendChild(rootNode);
    });

    this.setDisposeFn((() => {
      let index = viewContainerRef.indexOf(viewRef);
      if (index !== -1) {
        viewContainerRef.remove(index);
      }
    }));
  }

  private setDisposeFn(fn: () => void) {
    this.disposeFn = fn;
  }
}

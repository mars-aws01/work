import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, NgZone } from '@angular/core';

import { OverlayContainer } from './overlay-container.service';
import { OverlayRef } from './overlay-ref';

let nextUniqueId = 0; // 全局计数器

@Injectable()
export class Overlay {

  constructor(
    private overlayContainer: OverlayContainer,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private ngZone: NgZone
  ) { }

  /**
   * 创建弹出层实例
   */
  public create(): OverlayRef {
    const pane = this._createPaneElement();
    return new OverlayRef(pane, this.ngZone);
  }

  /**
   * 操作DOM，创建弹出层面板
   */
  private _createPaneElement(): HTMLElement {
    let pane = document.createElement('div');
    pane.id = `nk-overlay-${nextUniqueId++}`;
    pane.className = 'nk-overlay-pane';
    this.overlayContainer.getContainerElement().appendChild(pane);
    return pane;
  }
}

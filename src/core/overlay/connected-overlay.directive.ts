import { Directive, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { Overlay } from './overlay.service';
import { OverlayOriginDirective } from './overlay-origin.directive';
import { OverlayRef } from './overlay-ref';

@Directive({
  selector: '[nk-connected-overlay]',
  exportAs: 'nkConnectedOverlay'
})
export class ConnectedOverlayDirective implements OnChanges {

  private overlayRef: OverlayRef;

  @Input() origin: OverlayOriginDirective;
  @Input() open: boolean = false;

  constructor(
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.attachOverlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      this.open ? this.attachOverlay() : this.detachOverlay();
    }
  }

  public attachOverlay() {
    // 没有先创建实例
    if (!this.overlayRef) {
      this._createOverlay();
    }
    this.overlayRef.attach(this.viewContainerRef, this.templateRef);
  }

  public detachOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private _createOverlay() {
    this.overlayRef = this.overlay.create();
  }
}

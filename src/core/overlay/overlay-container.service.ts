import { Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class OverlayContainer implements OnDestroy {

  private containerElement: HTMLElement;

  constructor() { }

  ngOnDestroy(): void {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  }

  public getContainerElement(): HTMLElement {
    if (!this.containerElement) {
      let container = document.createElement('div');
      container.className = 'nk-overlay-container';
      document.body.appendChild(container);
      this.containerElement = container;
    }
    return this.containerElement;
  }
}

/** @docs-private */
export function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer: OverlayContainer) {
  return parentContainer || new OverlayContainer();
}

/** @docs-private */
export const OVERLAY_CONTAINER_PROVIDER = {
  // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
  provide: OverlayContainer,
  deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
  useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

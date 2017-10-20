import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[nk-overlay-origin]',
  exportAs: 'nkOverlayOrigin'
})
export class OverlayOriginDirective {
  constructor(
    private elementRef: ElementRef
  ) { }
}

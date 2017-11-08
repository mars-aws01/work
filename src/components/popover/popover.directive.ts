import './popover.directive.styl';

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { ComponentLoader, ComponentLoaderFactory } from '../../core';

import { PopoverContentComponent } from './popover-content.component';

@Directive({
  selector: '[nk-popover]'
})
export class PopoverDirective {
  @Input('nk-popover') content: TemplateRef<any> | string;
  @Input() placement: string = 'right';
  @Input() popoverTrigger: string = 'click';
  @Input() title: string = '';

  @Output() onShown: EventEmitter<any>;
  @Output() onHidden: EventEmitter<any>;

  private $el: any;
  private timerForInit: any;
  private isOpen: boolean = false;
  private _isInited = false;
  private popoverContent: ComponentLoader<PopoverContentComponent>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private clf: ComponentLoaderFactory
  ) {
    this.popoverContent = clf.createLoader<PopoverContentComponent>(
      elementRef,
      viewContainerRef,
      renderer
    );
    this.onShown = this.popoverContent.onShown;
    this.onHidden = this.popoverContent.onHidden;
  }

  ngOnInit() {
    if (this._isInited) {
      return;
    }
    this._isInited = true;
    this.popoverContent.listen({
      triggers: this.popoverTrigger,
      outsideClick: true,
      show: () => this.show()
    });
  }

  ngOnDestroy(): any {
    this.popoverContent.dispose();
  }

  private show() {
    if (this.popoverContent.isShown || !this.content) {
      return;
    }
    this.popoverContent
      .attach(PopoverContentComponent)
      .to(undefined)
      .position({ attachment: this.placement })
      .show({
        content: this.content,
        placement: this.placement,
        title: this.title
      });
    this.isOpen = true;
  }

  private hide(): void {
    if (this.isOpen) {
      this.popoverContent.hide();
      this.isOpen = false;
    }
  }
}

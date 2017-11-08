import './popover.directive.styl';

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[nk-popover]'
})
export class PopoverDirective {
  @Input('nk-popover') content: TemplateRef<any> | string;
  @Input() placement: string = 'right';
  @Input() delay: number | any = 0;
  @Input() allowHtml: boolean = false;
  @Input() popoverTrigger: string = 'click';
  @Input() title: string = '';

  private $el: any;
  private timerForInit: any;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.$el) {
      this.initPopover();
    }
  }

  ngAfterViewInit() {
    this.$el = jQuery(this.elementRef.nativeElement) as any;
    this.initPopover();
  }

  private isTemplateContent() {
    return typeof this.content !== 'string';
  }

  private getContent() {
    if (!this.isTemplateContent()) {
      return this.content;
    }
    let templateRef = this.content as TemplateRef<any>;
    let view = templateRef.createEmbeddedView(this.viewContainerRef);
    let div = document.createElement('div');
    for (let n of view.rootNodes) {
      div.appendChild(n);
    }
    return div.innerHTML;
  }

  private getPopoverOptions() {
    return {
      delay: this.delay,
      html: this.isTemplateContent() ? true : this.allowHtml,
      placement: this.placement,
      title: this.title,
      content: this.getContent(),
      trigger: this.popoverTrigger
    };
  }

  private initPopover() {
    console.log('init');
    window.clearTimeout(this.timerForInit);
    this.destroyPopover();
    this.timerForInit = setTimeout(() => {
      let opt = this.getPopoverOptions();
      this.$el.popover(opt);
    }, 300);
  }

  private destroyPopover() {
    try {
      this.$el.popover('destroy');
    } catch (e) {}
  }
}

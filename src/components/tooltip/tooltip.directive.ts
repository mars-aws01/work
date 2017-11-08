import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[nk-tooltip]'
})
export class TooltipDirective implements OnInit, OnChanges, AfterViewInit {
  @Input('nk-tooltip') content: string = '';
  @Input() placement: string = 'top';
  @Input() delay: number | any = 0;
  @Input() allowHtml: boolean = false;
  @Input() tooltipTrigger: string = 'hover focus';

  private $el: any;
  private timerForInit: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.$el) {
      this.initTooltip();
    }
  }

  ngAfterViewInit() {
    this.$el = jQuery(this.elementRef.nativeElement) as any;
    this.initTooltip();
  }

  private getTooltipOptions() {
    return {
      delay: this.delay,
      html: this.allowHtml,
      placement: this.placement,
      title: this.content,
      trigger: this.tooltipTrigger
    };
  }

  private initTooltip() {
    window.clearTimeout(this.timerForInit);
    this.destroyTooltip();
    this.timerForInit = setTimeout(() => {
      let opt = this.getTooltipOptions();
      this.$el.tooltip(opt);
    }, 300);
  }

  private destroyTooltip() {
    try {
      this.$el.tooltip('destroy');
    } catch (e) {}
  }
}

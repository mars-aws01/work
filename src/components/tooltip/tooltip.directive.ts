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

  public get tooltipOptions() {
    return {
      delay: this.delay,
      html: this.allowHtml,
      placement: this.placement,
      title: this.content,
      trigger: this.tooltipTrigger
    };
  }

  public get $el() {
    return jQuery(this.elementRef.nativeElement) as any;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('in');
    if (this.elementRef.nativeElement) {
      console.log('do');
      this.initTooltip();
    }
  }

  ngAfterViewInit() {
    this.initTooltip();
  }

  private initTooltip() {
    this.destroyTooltip();
    this.$el.tooltip(this.tooltipOptions);
  }

  private destroyTooltip() {
    try {
      this.$el.tooltip('destroy');
    } catch (e) {}
  }
}

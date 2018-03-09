import './widget.component.styl';

import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'nk-widget',
  templateUrl: 'widget.component.html'
})

export class WidgetComponent implements OnInit, OnChanges {

  public innerCollapsed: boolean = false;

  @Input() header: string;
  @Input() icon: string;
  @Input() collapsed: boolean = false;
  @Input() disabled: boolean = false;
  @Input() defaultColor: string = '';
  @Input() showCollapseBtn: boolean = true;
  @Input() showFullscreenBtn: boolean = false;
  @Input() showPickColorBtn: boolean = false;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('customHeader') customHeader: ElementRef;
  public get hasCustomHeader() {
    return this.customHeader.nativeElement.children.length > 0;
  }

  public get headerStyle() {
    const style = {};
    if (this.defaultColor) {
      style['background-color'] = this.defaultColor;
    }
    return style;
  }

  ngOnInit() { }

  ngOnChanges(changesObj: SimpleChanges) {
    if (changesObj.collapsed) {
      this.innerCollapsed = this.collapsed;
    }
  }

  public handleHeaderClick() {
    if (this.disabled) {
      return;
    }
    this.innerCollapsed = !this.innerCollapsed;
    this.collapsedChange.next(this.innerCollapsed);
  }
}

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nk-widget',
  templateUrl: 'widget.component.html'
})

export class WidgetComponent implements OnInit {

  public innerCollapsed: boolean = false;

  @Input() header: string;
  @Input() collapsed: boolean = false;
  @Input() disabled: boolean = false;

  @Output()
  public collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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

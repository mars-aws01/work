import './collapse-box.component.styl';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nk-collapse-box, nk-widget',
  templateUrl: 'collapse-box.component.html'
})

export class CollapseBoxComponent implements OnInit, OnChanges {

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

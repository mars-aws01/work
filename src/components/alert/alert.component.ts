import './alert.component.styl';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

const iconTypeMap = {
  info: 'fa-info-circle',
  danger: 'fa-times-circle',
  success: 'fa-check-circle',
  warning: 'fa-info-circle'
};

@Component({
  selector: 'nk-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnChanges {

  @Input() type: string = 'info';
  @Input() shown: boolean = true;
  @Output() shownChange: EventEmitter<boolean> = new EventEmitter();
  @Input() closable: boolean = true;
  @Input() inline: boolean = true;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public get alertClass() {
    let arr = [`nk-alert-${this.type}`];
    if (this.inline) {
      arr.push('nk-alert-inline');
    }
    return arr;
  }

  public get iconClass() {
    return iconTypeMap[this.type];
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  public onCloseBtnClick() {
    this.shown = false;
    this.shownChange.emit(false);
    this.onClose.emit(false);
  }
}

import './alert.component.styl';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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
  @Input() header: string;

  public get inlineHeader() {
    if (this.header) return this.header;
    switch (this.header) {
      case 'info':
        return 'Information';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Danger';
      case 'success':
        return 'Success';
      default:
        return 'Information';
    }
  }

  public get alertClass() {
    let arr = [`nk-alert-${this.type}`];
    if (this.inline) {
      arr.push('nk-alert-inline');
    }
    return arr;
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

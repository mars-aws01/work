import './alert.component.styl';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nk-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnChanges {

  @Input()
  public type: string = 'info';

  @Input()
  public alertClass: string = '';

  @Input()
  public shown: boolean = true;

  @Output()
  public shownChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  public closable: boolean = true;

  @Output()
  public onClose: EventEmitter<any> = new EventEmitter();

  public get innerClass() {
    return `alert-${this.type}`;
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

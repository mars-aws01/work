import './fixbar.component.styl';

import { Component, Input, OnInit } from '@angular/core';

export interface FixbarItem {
  title: string;
  icon: string;
  fn: Function;
};

@Component({
  selector: 'nk-fixbar',
  templateUrl: 'fixbar.component.html'
})
export class FixbarComponent implements OnInit {

  @Input()
  private items: Array<FixbarItem> = [];

  ngOnInit() { }

  public onItemClick(item: any, evt: MouseEvent) {
    if (typeof item.fn === 'function') {
      item.fn.call(null, evt);
    }
  }
}

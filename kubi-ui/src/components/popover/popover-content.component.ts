import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nk-popover-content',
  templateUrl: 'popover-content.component.html',
  host: {
    '[class]': `hostClass`,
    style: 'display:block;'
  }
})
export class PopoverContentComponent implements OnInit {
  @Input() placement: string;
  @Input() title: string;
  constructor() {}

  public get hostClass() {
    let arr = ['popover', 'fade', 'in'];
    arr.push(this.placement);
    return arr.join(' ');
  }

  ngOnInit() {}
}

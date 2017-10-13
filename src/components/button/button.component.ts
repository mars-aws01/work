import './button.component.styl';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nk-button',
  templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {

  @Input() type: string = 'normal'; // Set button type
  @Input() icon: string; // Set icon class
  @Input() disabled: boolean = false;
  @Input() width: string | number = '';

  public get buttonClass() {
    return {
      'nk-button-disabled': this.disabled,
      'nk-button-primary': this.type === 'primary'
    };
  }

  public get buttonStyle() {
    let style: any = {};
    if (this.width) {
      style.width = this.width + (typeof this.width === 'number' ? 'px' : '');
    }
    return style;
  }

  constructor() {

  }

  ngOnInit() {

  }
}

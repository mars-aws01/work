import './row.component.styl';

import { Component, Input, OnInit, style, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nk-row',
  templateUrl: 'row.component.html'
})

export class RowComponent implements OnInit {

  @ViewChild('rowDiv') rowDiv: ElementRef;

  @Input()
  public gutter: number = 0;

  @Input()
  public type: string;

  @Input()
  public justify: string = 'start';

  @Input()
  public align: string = 'top';

  @Input('style')
  set style(val: string) {
    if (val) {
      this._styleObj = {};
      let ruleParts = val.split(':');
      let key = this.camelize(ruleParts[0].trim());
      this._styleObj[key] = ruleParts[1].trim();
    } else {
      this._styleObj = null;
    }
  }
  private _styleObj: any;

  public get rowStyle() {
    let styleObj: any = {};
    if (this.gutter) {
      styleObj.marginLeft = `-${this.gutter / 2}px`;
      styleObj.marginRight = styleObj.marginLeft;
      styleObj.width = `calc(100% + ${this.gutter}px)`;
    }
    if (this._styleObj) {
      Object.assign(styleObj, this._styleObj)
    }
    return styleObj;
  }

  public get rowClass() {
    let cArr: string[] = [];
    if (this.justify !== 'start') {
      cArr.push(`is-justify-${this.justify}`);
    }
    if (this.align !== 'top') {
      cArr.push(`is-align-${this.align}`);
    }
    if (this.type === 'flex') {
      cArr.push('nk-row--flex');
    }
    return cArr;
  }

  ngOnInit() { }

  private camelize(str: string) {
    return str.replace(/(?:^|[-])(\w)/g, function (a, c) {
      c = a.substr(0, 1) === '-' ? c.toUpperCase() : c;
      return c ? c : '';
    });
  }
}

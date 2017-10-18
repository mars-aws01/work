import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { FormComponent } from './form.component';

@Component({
  selector: 'nk-form-item',
  templateUrl: 'form-item.component.html'
})

export class FormItemComponent implements OnInit {

  @Input() control: FormControl | NgModel;
  @Input() label: string;
  @Input() errorMsg: any = {};

  public get labelStyle() {
    return {
      width: this.labelWidth
    };
  }

  public get labelWidth() {
    return this.form.labelWidth;
  }

  public get contentStyle() {
    return {
      width: `calc(100% - ${this.labelWidth})`
    };
  }

  constructor(private form: FormComponent) {

  }

  ngOnInit() { }
}

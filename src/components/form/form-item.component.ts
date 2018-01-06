import { Component, Input, OnInit, ContentChildren, QueryList } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { FormComponent } from './form.component';

@Component({
  selector: 'nk-form-item',
  templateUrl: 'form-item.component.html'
})

export class FormItemComponent implements OnInit {

  @ContentChildren(NgModel)
  ngModels: QueryList<NgModel>

  @Input() control: FormControl | NgModel;
  @Input() label: string;
  @Input() errorMsg: any = {};

  innerForm: FormComponent;

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
    this.innerForm = form;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.ngModels.length > 0) {
      this.ngModels.toArray().forEach(x => {
        this.form.form.addControl(x);
      })
    }
  }

  ngOnDestroy() {

  }
}

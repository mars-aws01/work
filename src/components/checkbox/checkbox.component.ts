import './checkbox.component.styl';

import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'nk-checkbox',
  templateUrl: 'checkbox.component.html',
  providers: [CHECKBOX_VALUE_ACCESSOR]
})

export class CheckboxComponent implements OnInit, ControlValueAccessor {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  public disabled: boolean = false;
  public innerChecked: boolean = false;

  ngOnInit() { }

  public handleCheckedChange(v: boolean) {
    this.innerChecked = v;
    this.onChange(v);
  }

  writeValue(obj: any): void {
    this.innerChecked = Boolean(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    console.log(isDisabled);
  }
}

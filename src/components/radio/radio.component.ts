import './radio.component.styl';

import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};
@Component({
  selector: 'nk-radio',
  templateUrl: 'radio.component.html',
  providers: [RADIO_VALUE_ACCESSOR]
})

export class RadioComponent implements OnInit, ControlValueAccessor {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  public disabled: boolean = false;
  public innerValue: any;

  public get innerChecked() {
    return this.innerValue === this.value;
  }

  @Input() value: any = true;

  ngOnInit() { }

  public handleCheckedChange(v: boolean) {
    this.onChange(this.value);
    this.innerValue = this.value;
  }

  writeValue(obj: any): void {
    this.innerValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

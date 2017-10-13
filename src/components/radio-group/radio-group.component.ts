import './radio-group.component.styl';

import { Component, ContentChildren, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioComponent } from '../radio/radio.component';

export const RADIO_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true
};
@Component({
  selector: 'nk-radio-group',
  templateUrl: 'radio-group.component.html',
  providers: [RADIO_GROUP_VALUE_ACCESSOR]
})

export class RadioGroupComponent implements OnInit {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  public disabled: boolean = false;

  @ContentChildren(forwardRef(() => RadioComponent))
  public radioList: Array<RadioComponent> = [];

  ngOnInit() { }

  public setRadioGroupValue(v: any) {
    this.onChange(v);
    this.syncRadioValue(v);
  }

  private syncRadioValue(v: any) {
    this.radioList.forEach(r => r.innerValue = v);
  }

  writeValue(obj: any): void {
    this.syncRadioValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.radioList.forEach(r => r.disabled = isDisabled);
  }
}

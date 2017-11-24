import './radio.component.styl';

import { Component, Host, Input, OnInit, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioGroupComponent } from '../radio-group/radio-group.component';

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

  public innerValue: any;
  public innerDisabled: boolean = false;

  public get innerChecked() {
    return this.innerValue === this.value;
  }

  public get radioName() {
    return this.name || (this.radioGroup || { name: '' }).name || 'nk-radio';
  }

  @Input() value: any = true;
  @Input() disabled: boolean = false;
  @Input() name: string;

  constructor( @Optional() @Host() private radioGroup: RadioGroupComponent) {

  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.innerDisabled = this.disabled;
    }
  }

  public handleRadioClick(evt: MouseEvent) {
    evt && evt.stopPropagation();
    this.onChange(this.value);
    this.innerValue = this.value;
    // 如果有radio-group，则需要反向设置value
    if (this.radioGroup) {
      this.radioGroup.setRadioGroupValue(this.value);
    }
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
    this.innerDisabled = isDisabled;
  }
}

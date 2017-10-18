import './switch.component.styl';

import { Component, Input, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'nk-switch',
  templateUrl: 'switch.component.html',
  providers: [SWITCH_VALUE_ACCESSOR]
})

export class SwitchComponent implements OnInit, ControlValueAccessor {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  public innerDisabled: boolean = false;
  public innerChecked: boolean = false;

  @Input() disabled: boolean = false;

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.innerDisabled = this.disabled;
    }
  }

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
    this.innerDisabled = isDisabled;
  }
}

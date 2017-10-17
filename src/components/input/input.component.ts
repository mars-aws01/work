import './input.component.styl';

import { Component, HostBinding, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'nk-input',
  templateUrl: 'input.component.html',
  providers: [INPUT_VALUE_ACCESSOR]
})

export class InputComponent implements OnInit {
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  public innerValue: string;

  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 3;
  @Input() placeholder: string = '';

  public get isTextarea() {
    return this.type === 'textarea';
  }
  public get inputClass() {
    let arr = ['nk-input'];
    this.isTextarea && (arr.push('nk-textarea'));
    this.readonly && (arr.push('nk-input-readonly'));
    this.disabled && (arr.push('nk-input-disabled'));
    return arr;
  }

  constructor() {

  }

  ngOnInit() { }

  public handleModelChange(val: any) {
    this.innerValue = val;
    this.onChange(val);
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
}

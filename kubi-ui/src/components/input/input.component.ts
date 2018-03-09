import './input.component.styl';

import { Component, EventEmitter, HostBinding, Input, OnInit, Output, forwardRef } from '@angular/core';
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

export class InputComponent implements OnInit, ControlValueAccessor {
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  public innerValue: string;

  @HostBinding('class')
  public containerClass = 'nk-input-wrap';

  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 3;
  @Input() placeholder: string = '';
  @Input() icon: string;
  @Input() enableIconClick: boolean = false;
  @Input() maxlength: number = -1;

  @Output() iconClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  public get isTextarea() {
    return this.type === 'textarea';
  }

  public get inputClass() {
    let arr = ['nk-input'];
    this.isTextarea && (arr.push('nk-textarea'));
    this.readonly && (arr.push('nk-input-readonly'));
    this.disabled && (arr.push('nk-input-disabled'));
    !!this.icon && (arr.push('nk-input-has-icon'));
    return arr;
  }

  constructor() {
  }

  ngOnInit() {
  }

  public handleModelChange(val: any) {
    this.innerValue = val;
    this.onChange(val);
  }

  public handleIconClick(evt: MouseEvent) {
    if (!this.disabled || this.enableIconClick) {
      this.iconClick.emit(evt);
    }
  }

  innerBlur(evt: any) {
    this.onBlur.emit(evt);
    this.onTouched();
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

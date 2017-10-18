import './select.component.styl';

import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectOptionComponent } from './select-option.component';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'nk-select',
  templateUrl: 'select.component.html',
  providers: [SELECT_VALUE_ACCESSOR]
})

export class SelectComponent implements OnInit, ControlValueAccessor {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  private innerValue: any;
  public options: SelectOptionComponent[] = [];
  public dropdownShown: boolean = false;
  public selectedOption: SelectOptionComponent; // 选中的Item

  @Input() placeholder: string = '';
  @Input() allowClear: boolean = false;

  ngOnInit() { }

  public addOption(option: SelectOptionComponent) {
    this.options.push(option);
  }

  public removeOption(option: SelectOptionComponent) {
    this.options.splice(this.options.indexOf(option), 1);
  }

  public handleInputClick() {
    this.dropdownShown = true;
  }

  public handleItemClick(option: SelectOptionComponent) {
    this.selectedOption = option;
    this.onChange(this.selectedOption.value);
    this.dropdownShown = false;
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
    // this.innerDisabled = isDisabled;
  }
}

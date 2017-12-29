import { Component, ContentChildren, Input, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ArrayHelper } from '../../helpers';
import { CheckboxComponent } from '../checkbox/checkbox.component';

export const CHECKBOX_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true
};

@Component({
  selector: 'nk-checkbox-group',
  templateUrl: 'checkbox-group.component.html',
  providers: [CHECKBOX_GROUP_VALUE_ACCESSOR]
})

export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  public checkedValues: any[] = [];

  @Input() disabled: boolean = false;

  @ContentChildren(forwardRef(() => CheckboxComponent))
  public checkboxList: Array<CheckboxComponent> = [];

  constructor(private arrayHelper: ArrayHelper) {

  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      setTimeout(() => {
        this.checkboxList.forEach(c => c.innerDisabled = this.disabled);
      });
    }
  }

  public updateCheckboxGroupValue(v: any, checked: boolean) {
    this.checkedValues = this.arrayHelper[checked ? 'addValue' : 'removeValue'](this.checkedValues, v);
    this.onChange(this.checkedValues);
    this.syncCheckboxStatus();
  }

  private syncCheckboxStatus() {
    this.checkboxList.forEach(c => c.innerChecked = this.checkedValues.includes(c.value));
  }

  writeValue(obj: any): void {
    this.checkedValues = obj;    
    this.syncCheckboxStatus();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.checkboxList.forEach(c => c.innerDisabled = isDisabled);
  }
}

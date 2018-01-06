import './checkbox.component.styl';

import { Component, Host, Input, OnInit, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';

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

  public innerDisabled: boolean = false;
  public innerChecked: boolean = false;

  @Input() value: any;
  @Input() disabled: boolean = false;
  @Input('style') contentStyle: string = '';

  get _inlineStyle() {
    return this._domSanitizer.bypassSecurityTrustStyle(this.contentStyle);
  }

  constructor(
    @Optional() @Host() private checkboxGroup: CheckboxGroupComponent,
    private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.innerDisabled = this.disabled;
    }
  }

  public handleCheckedChange(evt: MouseEvent) {
    if (!evt) {
      return;
    }
    evt.stopPropagation();
    this.innerChecked = (evt.target as HTMLInputElement).checked;
    this.onChange(this.innerChecked);
    if (this.checkboxGroup) {
      this.checkboxGroup.updateCheckboxGroupValue(this.value, this.innerChecked);
    }
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

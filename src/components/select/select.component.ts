import './select.component.styl';

import { Component, Input, OnInit, Renderer2, forwardRef, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('select2Ctrl') select2Ctrl: ElementRef;

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  public options: SelectOptionComponent[] = [];
  public selectedValue: any;
  private dataSource: Array<any>;

  @Input() placeholder: string = '';
  @Input() allowClear: boolean = false;
  @Input() disabled: boolean = false;
  @Input() allowSearch: boolean = false;

  private _select2Ctrl: any;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let $ = window['jQuery'] || window['$']
    if (!$) {
      return console.error('nk-select component need jQuery support');
    }
    if (!$('body').select2) {
      return console.error('nk-select component need select2 support');
    }
    this._select2Ctrl = $(this.select2Ctrl.nativeElement);
    this._select2Ctrl.select2({
      placeholder: this.placeholder || '',
      allowClear: this.allowClear,
      disabled: this.disabled,
      data: this.dataSource,
      minimumResultsForSearch: this.allowSearch ? 0 : -1
    }).on('select2:select', (e: any) => {
      let data = e.params.data.data;      
      this.onChange(data);
    });
    this.updateDataSource();
    this.updateSelect2Value();
  }

  ngOnDestroy() {
    this._select2Ctrl.select2('destroy');
  }

  updateSelect2Value() {
    if (this._select2Ctrl) {
      this._select2Ctrl.val(this.selectedValue);
      this._select2Ctrl.trigger('change');
    }
  }

  updateDataSource() {
    let data: any = [];    
    if (this.options) {
      data = this.options.map(o => {
        return {
          id: o.value,
          text: o.label,
          disabled: o.disabled,
          data: o.value
        }
      })
    }
    this.dataSource = data;
    this._select2Ctrl && this._select2Ctrl.select2({ data: data });
  }

  public addOption(option: SelectOptionComponent) {
    this.options.push(option);
    this.updateDataSource();
  }

  public removeOption(option: SelectOptionComponent) {
    this.options.splice(this.options.indexOf(option), 1);
    this.updateDataSource();
  }

  writeValue(obj: any): void {
    this.selectedValue = obj;
    this.updateSelect2Value();
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

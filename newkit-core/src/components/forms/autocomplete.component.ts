import { Component, OnInit, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'nk-autocomplete',
  templateUrl: 'autocomplete.component.html',
  providers: [AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoCompleteComponent extends ComponentBase implements OnInit {

  @Input()
  private textField: string = 'text';

  @Input()
  private valueField: string = 'value';

  @Input()
  private minLength: number;

  @Input()
  private maxItems: number = 10;

  @Input()
  private delay: number = 100;

  @Input()
  private disabled: boolean = false;

  @Input()
  private placeholder: string = '';

  @Input()
  private source: Array<any> = [];

  private candidateData: Array<any> = [];
  private filterKey: string = '';
  private filterChanged: boolean;
  private filterTimeout: any;
  private focusedIndex: number = -1;
  private inputFocused: boolean = false;
  private searching: boolean = false;

  private innerValue: any;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'smart-form';
    super.watch('innerValue', (newVal, oldValue) => {
      this.onChange(this.innerValue);
    });
  }

  public writeValue(value: any): void {
    if (value) {
      this.filterKey = this.textField ? value[this.textField] : value;
    }
    this.innerValue = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private inputFocus() {
    this.inputFocused = true;
    this.filterChanged = false;
    this.focusedIndex = -1;
  }

  private inputBlur() {
    this.inputFocused = false;
  }

  private inputKeyDown(event: any) {
    if (!event) return;
    if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) return;
    event.stopPropagation();
    event.preventDefault();
    if (event.keyCode === 13) {
      this.filterChanged = false;
      this.focusedIndex = -1;
      return;
    }
    if (event.keyCode === 38) {
      this.focusedIndex--;
      if (this.focusedIndex < 0) {
        this.focusedIndex = this.candidateData.length - 1;
      }
      this._calcScrollTop();
    }
    if (event.keyCode === 40) {
      this.focusedIndex++;
      if (this.focusedIndex > this.candidateData.length - 1) {
        this.focusedIndex = 0;
      }
      this._calcScrollTop();
    }
    let selectedItem = this.candidateData[this.focusedIndex];
    this.filterKey = this.textField ? selectedItem[this.textField] : selectedItem;
    this.innerValue = this.valueField ? selectedItem[this.valueField] : selectedItem;
  }

  private _calcScrollTop(){
    
  }

  private inputValueChanged(value: any) {
    this.filterKey = value;
    this.filterChanged = true;
    this.innerValue = null;
    if (!this.filterKey || this.filterKey.length < this.minLength) return;
    if (this.filterTimeout) clearTimeout(this.filterTimeout);
    this.candidateData = [];
    this.filterTimeout = setTimeout(() => {
      this.searching = true;
      if (typeof this.source === 'function') {
        let request = { term: this.filterKey };
        this.source(request, (result) => {
          this.candidateData = this.filter(this.filterKey, result, this.maxItems);
          this.searching = false;
        });
      } else {
        if (this.source.length > 0 && typeof this.source[0] !== 'object') {
          this.source = this.source.map(item => {
            return {
              [this.valueField]: item,
              [this.textField]: item
            };
          });
        }
        this.candidateData = this.filter(this.filterKey, this.source, this.maxItems, true);
        this.searching = false;
      }
    }, this.delay);
  }

  private filter(key: string, datas: any, maxItems: number, needProcess: boolean = false) {
    datas = datas || [];
    if (datas.length === 0) return [];
    let tempData;
    if (!needProcess) {
      tempData = datas;
    } else {
      let regex = new RegExp(this.filterKey, 'i');
      tempData = datas.filter(item => {
        return regex.test(item[this.textField]);
      });
    }
    return tempData.slice(0, maxItems);
  }

  private setFocusIndex(index) {
    this.focusedIndex = index;
  }

  private itemMouseDown(event) {
    event.preventDefault();
  }

  private itemSelect(item: any) {
    this.filterKey = this.textField ? item[this.textField] : item;
    this.innerValue = this.valueField ? item[this.valueField] : item;
    this.filterChanged = false;
  }
}

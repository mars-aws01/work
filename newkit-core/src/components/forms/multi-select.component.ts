import { Component, forwardRef, OnInit, Input, Output, OnChanges, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';

export const MULTI_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true
};

export interface tagsItem {
  text: string;
  value: string;
  disabled: boolean;
};
@Component({
  selector: 'nk-multi-select',
  templateUrl: 'multi-select.component.html',
  providers: [MULTI_SELECT_VALUE_ACCESSOR]
})
export class MultiSelectComponent extends ComponentBase implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  private innerDataSource = [];
  private $el: any;
  private innerValue: any;

  @Input()
  private dataSource: Array<any> | Function;

  @Input()
  private textField: string = 'text';

  @Input()
  private valueField: string = 'value';

  constructor(private elementRef: ElementRef) {
    super();
    super.watch('innerValue', (newVal, oldValue) => {
      if (_.isEqual(newVal, oldValue)) {
        return;
      }
      this.onChange(newVal);
    });
  }

  ngOnInit() {
    this.$el = $(this.elementRef.nativeElement.querySelector('select'));
    this.$el.select2();
    this.$el.on('change', (e) => {
      this.innerValue = this.$el.val();
    });
  }

  ngOnChanges(changesObj) {
    this.processDataSource();
  }

  ngAfterViewInit() {

  }

  public writeValue(value: any): void {
    this.$el.val(value);
    this.$el.trigger('change');
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private processDataSource() {
    if (Array.isArray(this.dataSource)) {
      if (this.dataSource.length > 0 && typeof this.dataSource[0] !== 'object') {
        this.innerDataSource = (this.dataSource as Array<any>).map(item => {
          return {
            [this.textField]: item,
            [this.valueField]: item
          };
        });
      } else {
        this.innerDataSource = this.dataSource.slice(0);
      }
    } else if (typeof this.dataSource === 'function') { // 此处放置异步数据

    }
  }
}
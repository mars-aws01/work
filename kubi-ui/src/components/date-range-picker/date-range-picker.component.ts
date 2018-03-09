import './date-range-picker.styl';

import { Component, ViewChild, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SaDate } from './../date-picker/SaDate';

@Component({
  selector: 'nk-date-range',
  templateUrl: './date-range-picker.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerComponent),
    multi: true
  }]
})

export class DateRangePickerComponent implements ControlValueAccessor {

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  @ViewChild('dateRangeInput') dateRangeInput: ElementRef;
  @ViewChild('dateRangePickerContainer') dateRangePickerContainer: ElementRef;

  @Input() disabled: boolean = false;
  // @Input() mode: string = 'day';
  @Input() placeholder: string = '';
  // @Input() lang: string = 'en-us';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  // @Input() format: string = 'yyyy/MM/dd';
  @Input() allowClear: boolean = false;

  pickerShown: boolean = false;

  private _innerDateRange: any = null;
  private _dataRangePicker: any;

  get innerDateString(): string {
    let range = '';
    if (this._innerDateRange && this._innerDateRange.from && this._innerDateRange.to) {
      range = `${new SaDate(this._innerDateRange.from).format('yyyy-MM-dd')} ~ ${new SaDate(this._innerDateRange.to).format('yyyy-MM-dd')}`;
    }
    return range;
  }

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    let opt: any = {
      parentEl: this.dateRangePickerContainer.nativeElement,
      autoUpdateInput: false,
      autoApply: true,
      template: '<div class="daterangepicker dropdown-menu nk-date-range-picker">' +
        '<div class="calendar left">' +
        '<div class="calendar-table"></div>' +
        '</div>' +
        '<div class="calendar right">' +
        '<div class="calendar-table"></div>' +
        '</div>' +
        '</div>'
    };
    if (this._innerDateRange) {
      if (this._innerDateRange.from) {
        opt.startDate = new SaDate(this._innerDateRange.from).format('MM/dd/yyyy');
      }
      if (this._innerDateRange.to) {
        opt.endDate = new SaDate(this._innerDateRange.to).format('MM/dd/yyyy');
      }
    }
    if (this.minDate) {
      opt.minDate = new SaDate(this.minDate).format('MM/dd/yyyy');
    }
    if (this.maxDate) {
      opt.maxDate = new SaDate(this.maxDate).format('MM/dd/yyyy');
    }
    window['jQuery'](this.dateRangeInput.nativeElement)
      .daterangepicker(opt)
      .on('show.daterangepicker', (ev: any) => {
        this.pickerShown = true;
      })
      .on('hide.daterangepicker', (ev: any) => {
        this.pickerShown = false;
      })
      .on('apply.daterangepicker', (ev: any, picker: any) => {
        let tempRange = {
          from: picker.startDate.toDate(),
          to: picker.endDate.toDate()
        };
        this._innerDateRange = tempRange;
        this.onChange(tempRange);
      });

    this._dataRangePicker = $(this.dateRangeInput.nativeElement).data('daterangepicker');
  }

  ngOnDestroy() {
    window['jQuery'](this.dateRangeInput.nativeElement).data('daterangepicker').remove();
  }

  clearDate() {
    if (this.allowClear && !this.disabled && this._dataRangePicker) {
      this._innerDateRange = null;
      this.onChange(this._innerDateRange);
      this._dataRangePicker.setStartDate(new Date());
      this._dataRangePicker.setEndDate(new Date());
    }
  }

  writeValue(obj: any): void {
    let tempObj: any = null;
    if (obj && obj.from && obj.to) {
      tempObj = {};
      tempObj.from = obj.from;
      tempObj.to = obj.to;
    } else {
      if (obj && (obj.from || obj.to)) {
        this.onChange(tempObj);
      }
    }
    this._innerDateRange = tempObj;
    if (this._dataRangePicker) {
      let form = (this._innerDateRange && this._innerDateRange.form) || new Date();
      let to = (this._innerDateRange && this._innerDateRange.to) || new Date();
      this._dataRangePicker.setStartDate(form);
      this._dataRangePicker.setEndDate(to);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

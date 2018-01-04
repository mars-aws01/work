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

  pickerShown: boolean = false;

  private _innerDateRange: any = {
    from: null,
    to: null
  };
  private _dataRangePicker: any;

  get innerDateString(): string {
    let range = '';
    if (this._innerDateRange.from && this._innerDateRange.to) {
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
    if (this._innerDateRange.from) {
      opt.startDate = new SaDate(this._innerDateRange.from).format('MM/dd/yyyy');
    }
    if (this._innerDateRange.to) {
      opt.endDate = new SaDate(this._innerDateRange.to).format('MM/dd/yyyy');
    }
    if (this.minDate) {
      opt.minDate = new SaDate(this.minDate).format('MM/dd/yyyy');
    }
    if (this.maxDate) {
      console.log(this.maxDate)
      opt.maxDate = new SaDate(this.maxDate).format('MM/dd/yyyy');
    }
    $(this.dateRangeInput.nativeElement)
      .daterangepicker(opt)
      .on('show.daterangepicker', (ev: any) => {
        this.pickerShown = true;
      })
      .on('hide.daterangepicker', (ev: any) => {
        this.pickerShown = false;
      })
      .on('apply.daterangepicker', (ev: any, picker: any) => {
        this._innerDateRange.from = picker.startDate.toDate();
        this._innerDateRange.to = picker.endDate.toDate();
        this.onChange(this._innerDateRange);
      });

    this._dataRangePicker = $(this.dateRangeInput.nativeElement).data('daterangepicker');
  }

  writeValue(obj: any): void {
    let tempObj: any = {
      from: null,
      to: null
    }
    if (obj && obj.from && obj.to) {
      tempObj.from = obj.from;
      tempObj.to = obj.to;
    } else {
      if (obj && (obj.from || obj.to)) {
        this.onChange(tempObj);
      }
    }
    this._innerDateRange = tempObj;
    if (this._dataRangePicker) {
      this._dataRangePicker.setStartDate(this._innerDateRange.from || new Date());
      this._dataRangePicker.setEndDate(this._innerDateRange.to || new Date());
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

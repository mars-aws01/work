import './time-range-picker.styl';

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nk-time-range',
  templateUrl: './time-range-picker.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeRangePickerComponent),
    multi: true
  }]
})

export class TimeRangePickerComponent implements ControlValueAccessor {

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  innerDateRange: any;
  pickerShown: boolean = false;

  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() allowClear: boolean = false;

  get innerDateString(): string {
    if (this.innerDateRange && this.innerDateRange.from.date && this.innerDateRange.to.date) {
      let fhours = this.innerDateRange.from.date.getHours();
      let fmins = this.innerDateRange.from.date.getMinutes();
      let timeFrom = `${fhours < 10 ? '0' + fhours : fhours}:${fmins < 10 ? '0' + fmins : fmins}`;

      let thours = this.innerDateRange.to.date.getHours();
      let tmins = this.innerDateRange.to.date.getMinutes();
      let timeTo = `${thours < 10 ? '0' + thours : thours}:${tmins < 10 ? '0' + tmins : tmins}`;

      return `${timeFrom} - ${timeTo}`;
    }
    return '';
  }

  constructor() { }

  ngOnInit() { }

  keyDown(evt: any) {
    if (evt.keyCode === 13) {
      evt.stopPropagation();
      evt.preventDefault();
      if (this.innerDateRange.from.innerHours > this.innerDateRange.to.innerHours) return;
      if (this.innerDateRange.from.innerHours === this.innerDateRange.to.innerHours) {
        if (this.innerDateRange.from.innerMins > this.innerDateRange.to.innerMins) return;
      }
      if (!this.innerDateRange.from.date) this.innerDateRange.from.date = new Date();
      if (!this.innerDateRange.to.date) this.innerDateRange.to.date = new Date();

      this.innerDateRange.from.date.setHours(this.innerDateRange.from.innerHours);
      this.innerDateRange.from.date.setMinutes(this.innerDateRange.from.innerMins);
      this.innerDateRange.to.date.setHours(this.innerDateRange.to.innerHours);
      this.innerDateRange.to.date.setMinutes(this.innerDateRange.to.innerMins);

      this.onChange({
        from: new Date(this.innerDateRange.from.date),
        to: new Date(this.innerDateRange.to.date)
      });
      this.pickerShown = false;
    }
  }

  hourChange(value: any, type: string) {
    this.innerDateRange[type].innerHours = null;
    if (value !== null) {
      value = parseInt(value);
      if (value >= 0 && value <= 23) {
        setTimeout(() => {
          this.innerDateRange[type].innerHours = value;
        });
      }
    }
  }

  minChange(value: any, type: string) {
    this.innerDateRange[type].innerMins = null;
    if (value !== null) {
      value = parseInt(value);
      if (value >= 0 && value <= 59) {
        setTimeout(() => {
          this.innerDateRange[type].innerMins = value;
        });
      }
    }
  }

  toggleTimePicker() {
    if (!this.innerDateRange) {
      this.innerDateRange = {
        from: {
          date: null
        },
        to: {
          date: null
        }
      }
    }
    if (this.pickerShown === false) {
      this.innerDateRange.from.innerHours = this.innerDateRange.from.date ? this.innerDateRange.from.date.getHours() : null;
      this.innerDateRange.from.innerMins = this.innerDateRange.from.date ? this.innerDateRange.from.date.getMinutes() : null;

      this.innerDateRange.to.innerHours = this.innerDateRange.to.date ? this.innerDateRange.to.date.getHours() : null;
      this.innerDateRange.to.innerMins = this.innerDateRange.to.date ? this.innerDateRange.to.date.getMinutes() : null;
    }
    this.pickerShown = !this.pickerShown;
  }

  clearTime() {
    if (this.allowClear && !this.disabled) {
      this.innerDateRange = null;
      this.onChange(null);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.innerDateRange = {
        from: { date: obj.from },
        to: { date: obj.to }
      }
    } else {
      this.innerDateRange = null;
      this.onChange(null);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

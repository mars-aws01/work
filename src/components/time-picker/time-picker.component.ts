import './time-picker.styl';

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nk-time-picker',
  templateUrl: './time-picker.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
  }]
})

export class TimePickerComponent implements ControlValueAccessor {

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  innerDate: Date;
  innerHours: number;
  innerMins: number;
  pickerShown: boolean = false;

  @Input() placeholder: string;
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() { }

  public get innerDateString() {
    if (this.innerDate) {
      let hours = this.innerDate.getHours();
      let mins = this.innerDate.getMinutes();
      let time = `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
      return time;
    }
    return '';
  }

  keyDown(evt: any) {
    if (evt.keyCode === 13) {
      evt.stopPropagation();
      evt.preventDefault();
      if (!this.innerDate) this.innerDate = new Date();
      this.innerDate.setHours(this.innerHours);
      this.innerDate.setMinutes(this.innerMins);
      this.onChange(new Date(this.innerDate));
      this.pickerShown = false;
    }
  }

  hourChange(value: any) {
    this.innerHours = null;
    if (value !== null) {
      value = parseInt(value);
      if (value >= 0 && value <= 23) {
        setTimeout(() => {
          this.innerHours = value;
        });
      }
    }
  }

  minChange(value: any) {
    this.innerMins = null;
    if (value !== null) {
      value = parseInt(value);
      if (value >= 0 && value <= 59) {
        setTimeout(() => {
          this.innerMins = value;
        });
      }
    }
  }

  toggleTimePicker() {
    if (this.pickerShown === false) {
      this.innerHours = this.innerDate ? this.innerDate.getHours() : null;
      this.innerMins = this.innerDate ? this.innerDate.getMinutes() : null;
    }
    this.pickerShown = !this.pickerShown;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.innerDate = new Date(obj);
    } else {
      this.innerDate = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

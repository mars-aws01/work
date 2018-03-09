import { Component } from '@angular/core';

@Component({
  selector: 'timepicker-demo',
  templateUrl: './timepicker-demo.html'
})

export class TimePickerDemoComponent {

  currentTime: any;
  currentTime2: any;

  ngOnInit() {
    this.currentTime = new Date();
  }

  timeChange(value: any) {
    this.currentTime = value;
  }
}

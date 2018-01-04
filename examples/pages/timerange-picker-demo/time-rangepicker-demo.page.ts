import { Component } from '@angular/core';

@Component({
  selector: 'time-rangepicker-demo',
  templateUrl: './time-rangepicker-demo.html'
})

export class TimeRangePickerDemoComponent {

  timeRange: any;

  ngOnInit() {
    this.timeRange = {
      from: new Date('2018-01-02 12:00:00'),
      to: new Date('2018-01-02 15:00:00')
    }
  }
}

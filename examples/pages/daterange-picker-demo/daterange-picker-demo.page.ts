import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'daterange-picker-demo',
  templateUrl: 'daterange-picker-demo.html'
})

export class DateRangePickerDemoComponent implements OnInit {

  range: any = {
    from: new Date(),
    // to: new Date(new Date().valueOf() + (2*24*60*60*1000))
  };

  maxDate = new Date(new Date().valueOf() + (7 * 24 * 60 * 60 * 1000))

  constructor() {

  }

  ngOnInit() { }
}

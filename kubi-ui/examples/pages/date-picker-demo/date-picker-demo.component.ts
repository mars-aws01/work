import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date-picker-demo',
  templateUrl: 'date-picker-demo.component.html'
})

export class DatePickerDemoComponent implements OnInit {

  selectDate: any = new Date();
  selectYear: any;
  selectMonth: any;

  ngOnInit() { }
}

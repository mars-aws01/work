import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
   selector: 'date-range-picker',
   templateUrl: 'date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
    private dateFrom: Date;
    private dateTo: Date;
    
    @Output() startDateChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() endDateChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() set startDate(value: Date) {
        this.dateFrom = value;
        this.startDateChange.emit(value);
    }
    get startDate(): Date {
        return this.dateFrom;
    }

    @Input() set endDate(value: Date) {
        this.dateTo = value;
        this.endDateChange.emit(value);
    }
    get endDate(): Date {
        return this.dateTo;
    }


    public bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });

    constructor(
    ) { }
  
    ngOnInit() {

    }

}

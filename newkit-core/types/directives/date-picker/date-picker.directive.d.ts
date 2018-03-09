import { ElementRef, OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const DATE_PICKER_VALUE_ACCESSOR: any;
export declare class DatePickerDirective implements OnInit, OnChanges, ControlValueAccessor {
    private elementRef;
    private $el;
    onChange: any;
    onTouched: any;
    private format;
    private minDate;
    private maxDate;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    private _buildOptions();
    private _initDatepicker();
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

import { ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RATING_VALUE_ACCESSOR: any;
export declare class RatingComponent implements ControlValueAccessor, OnInit {
    private elementRef;
    onChange: any;
    onTouched: any;
    private value;
    private hoverIdx;
    private rateArr;
    private maxNum;
    private rateClass;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    onClick(v: any): void;
    onMouseLeave(v: any): void;
    onMouseEnter(v: any): void;
    private updateRateArr();
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

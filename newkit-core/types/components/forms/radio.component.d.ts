import { ElementRef, OnChanges, OnInit } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioComponent extends ComponentBase implements OnInit, OnChanges {
    private elementRef;
    value: any;
    disabled: boolean;
    private name;
    private innerValue;
    onChange: any;
    onTouched: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    private setName();
    ngOnChanges(changesObj: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

import { ElementRef, OnInit } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
export declare const SWITCH_VALUE_ACCESSOR: any;
export declare class SwitchComponent extends ComponentBase implements OnInit {
    private elementRef;
    private onText;
    private offText;
    private disabled;
    private name;
    private innerValue;
    onChange: any;
    onTouched: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

import { ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class CheckBoxComponent extends ComponentBase implements ControlValueAccessor, OnInit {
    private elementRef;
    private disabled;
    private name;
    private checked;
    onChange: any;
    onTouched: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    private setName();
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

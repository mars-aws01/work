import { OnInit, OnChanges, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';
export declare const MULTI_SELECT_VALUE_ACCESSOR: any;
export interface tagsItem {
    text: string;
    value: string;
    disabled: boolean;
}
export declare class MultiSelectComponent extends ComponentBase implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    private elementRef;
    onChange: any;
    onTouched: any;
    private innerDataSource;
    private $el;
    private innerValue;
    private dataSource;
    private textField;
    private valueField;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private processDataSource();
}

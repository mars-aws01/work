import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const DROP_DOWN_LIST_VALUE_ACCESSOR: any;
export declare class DropDownListComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private elementRef;
    private showPopupPanel;
    private innerText;
    private onDocumentClick;
    onChange: any;
    onTouched: any;
    private dataSource;
    private multi;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    dropdownItemClick(item: any, evt: any): void;
    private setNgModelValue();
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

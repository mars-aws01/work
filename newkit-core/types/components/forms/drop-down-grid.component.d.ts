import { OnInit, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const DROP_DOWN_GRID_VALUE_ACCESSOR: any;
export declare class DropDownGridComponent implements OnInit, ControlValueAccessor {
    private elementRef;
    private innerValue;
    onChange: any;
    onTouched: any;
    private el;
    private showPopupPanel;
    private onDocumentClick;
    private columns;
    private dataSource;
    private key;
    private onSelectChanged;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onRowClick(rowData: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

import { OnInit, ElementRef } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
export declare const TAG_INPUT_VALUE_ACCESSOR: any;
export declare class TagInputComponent extends ComponentBase implements OnInit {
    private elementRef;
    onChange: any;
    onTouched: any;
    private tags;
    private $el;
    private inputValue;
    private readonly inputSize;
    private placeholder;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    addTag(evt: any): void;
    private notifyValueChange();
    removeTag(idx: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}

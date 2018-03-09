import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const NUMBER_VALIDATOR: any;
export declare class NumberValidator implements Validator, OnChanges {
    constructor();
    private number;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}

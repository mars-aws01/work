import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const EQUAL_TO_VALIDATOR: any;
export declare class EqualToValidator implements Validator, OnChanges {
    constructor();
    private equalTo;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}

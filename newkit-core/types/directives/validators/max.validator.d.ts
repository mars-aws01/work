import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const MAX_VALIDATOR: any;
export declare class MaxValidator implements Validator, OnChanges {
    constructor();
    private max;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}

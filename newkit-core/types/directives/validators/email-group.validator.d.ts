import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const EMAIL_GROUP_VALIDATOR: any;
export declare class EmailGroupValidator implements Validator, OnChanges {
    constructor();
    private emailGroup;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}

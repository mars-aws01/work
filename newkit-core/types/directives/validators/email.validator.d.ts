import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const EMAIL_VALIDATOR: any;
export declare class EmailValidator implements Validator, OnChanges {
    constructor();
    private email;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}

import { OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { Observable } from "rxjs";
export declare const VALIDATE_FN_VALIDATOR: any;
export declare class ValidateFnValidator implements Validator, OnChanges {
    constructor();
    private validateFn;
    private _validator;
    private _onChange;
    private _createValidator();
    ngOnChanges(changesObj: any): void;
    validate(c: AbstractControl): Promise<{
        [key: string]: any;
    }> | Observable<{
        [key: string]: any;
    }>;
}

import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
export declare class NegValidators {
    constructor();
    static min(minValue: number): ValidatorFn;
    static max(maxValue: number): ValidatorFn;
    static url(): ValidatorFn;
    static email(): ValidatorFn;
    static emailGroup(): ValidatorFn;
    static ip(): ValidatorFn;
    static integer(): ValidatorFn;
    static date(): ValidatorFn;
    static number(): ValidatorFn;
    static equal(equalValue: any): ValidatorFn;
    static equalTo(equalTo: any): ValidatorFn;
    static validateFn(fn: Function): AsyncValidatorFn;
}

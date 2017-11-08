import {
  AbstractControl,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  Validator
} from '@angular/forms';
import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef
} from '@angular/core';

import { NkValidators } from './NkValidators';
import { Observable } from 'rxjs';

export const VALIDATE_FN_VALIDATOR: any = {
  provide: NG_ASYNC_VALIDATORS,
  useExisting: forwardRef(() => ValidateFnValidator),
  multi: true
};

@Directive({
  selector:
    '[validateFn][formControlName],[validateFn][formControl],[validateFn][ngModel]',
  providers: [VALIDATE_FN_VALIDATOR]
})
export class ValidateFnValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private validateFn: Function;

  private _validator: AsyncValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.validateFn(this.validateFn);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.validateFn) {
      this._createValidator();
      if (this._onChange) {
        this._onChange();
      }
    }
  }

  validate(
    c: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    return this._validator(c);
  }
}

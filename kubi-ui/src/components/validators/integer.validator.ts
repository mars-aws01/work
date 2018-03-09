import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn
} from '@angular/forms';
import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef
} from '@angular/core';

import { NkValidators } from './NkValidators';

export const INTEGER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IntegerValidator),
  multi: true
};

@Directive({
  selector:
    '[integer][formControlName],[integer][formControl],[integer][ngModel]',
  providers: [INTEGER_VALIDATOR]
})
export class IntegerValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private integer: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.integer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.integer) {
      this._createValidator();
      if (this._onChange) {
        this._onChange();
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this._validator(c);
  }
}

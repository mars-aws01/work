import {
  AbstractControl,
  FormControl,
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

export const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true
};

@Directive({
  selector:
    '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR]
})
export class EqualToValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private equalTo: FormControl | string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.equalTo(this.equalTo);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.equalTo) {
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

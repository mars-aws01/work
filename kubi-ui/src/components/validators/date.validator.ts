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

export const DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateValidator),
  multi: true
};

@Directive({
  selector: '[date][formControlName],[date][formControl],[date][ngModel]',
  providers: [DATE_VALIDATOR]
})
export class DateValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private date: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
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

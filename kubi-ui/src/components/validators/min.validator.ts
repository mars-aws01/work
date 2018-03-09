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

export const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};

@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALIDATOR]
})
export class MinValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private min: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.min(+this.min);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.min) {
      this._createValidator();
      if (this._onChange) {
        this._onChange();
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.min ? this._validator(c) : null;
  }
}

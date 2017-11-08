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

export const EMAIL_GROUP_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailGroupValidator),
  multi: true
};

@Directive({
  selector:
    '[emailGroup][formControlName],[emailGroup][formControl],[emailGroup][ngModel]',
  providers: [EMAIL_GROUP_VALIDATOR]
})
export class EmailGroupValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private emailGroup: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.emailGroup();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.emailGroup) {
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

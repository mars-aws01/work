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

export const IP_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IpValidator),
  multi: true
};

@Directive({
  selector: '[ip][formControlName],[ip][formControl],[ip][ngModel]',
  providers: [IP_VALIDATOR]
})
export class IpValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private ip: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.ip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ip) {
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

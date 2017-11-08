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

export const URL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UrlValidator),
  multi: true
};

@Directive({
  selector: '[url][formControlName],[url][formControl],[url][ngModel]',
  providers: [URL_VALIDATOR]
})
export class UrlValidator implements Validator, OnChanges {
  constructor() {}

  @Input() private url: string;

  private _validator: ValidatorFn;
  private _onChange: () => void;

  private _createValidator() {
    this._validator = NkValidators.url();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url) {
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

import { Component, Input, OnInit, } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'nk-validator',
  templateUrl: 'validator.component.html'
})

export class ValidatorComponent implements OnInit {

  public validationTypes = [
    'required', 'minlength', 'maxlength', 'pattern', 'date', 'email', 'emailGroup', 'equal', 'equalTo',
    'integer', 'number', 'ip', 'url', 'max', 'min', 'validateFn'
  ];

  @Input() control: NgModel | FormControl;

  @Input() requiredMsg: string = 'This field is required.';
  @Input() minlengthMsg: string = 'Field letters must greater and equals to {0}.';
  @Input() maxlengthMsg: string = 'Field letters must less or equalss to {0}.';
  @Input() patternMsg: string = 'Field must match `{0}`.';
  @Input() dateMsg: string = 'Please enter a date.';
  @Input() emailMsg: string = 'Please enter an email address.';
  @Input() emailGroupMsg: string = 'Please enter any email address.';
  @Input() equal: string = 'Field must be equal to `{0}`.';
  @Input() equalTo: string = 'Field must be equal to `{{control?.errors?.equalTo.to}}` field.';
  @Input() integerMsg: string = 'Please enter an integer.';
  @Input() ipMsg: string = 'Please enter an ip address.';
  @Input() maxMsg: string = 'Field must less than or equals to {0}.';
  @Input() minMsg: string = 'Field must greater than or equals to {0}.';
  @Input() numberMsg: string = 'Please enter a number.';
  @Input() urlMsg: string = 'Please enter an valid url.';
  @Input() validateFnMsg: string = 'Custom validate error.';

  ngOnInit() { }

  public getShown(type: string) {
    return this.getValue(type) !== undefined;
  }

  public getErrorMessage(type: string) {
    let val: any = this.getValue(type);
    return (this[`${type}Msg`] || '')
      .replace(`{0}`, val.to || val.requiredLength || val.requiredValue);
  }

  private getValue(type: string) {
    this.control && this.control.errors && this.control.errors[type];
  }
}

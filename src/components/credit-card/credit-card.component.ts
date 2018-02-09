import './credit-card.css';
import { Component, ViewChild, ElementRef, Input, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nk-credit-card',
  templateUrl: './credit-card.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreditCardComponent),
    multi: true
  }]
})

export class CreditCardComponent implements ControlValueAccessor {

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;
  private innerValue: string;

  @ViewChild('inputEle')
  inputEle: ElementRef;

  @Input()
  placeholder: string = 'Card Number';

  @Input()
  get customMask(): string {
    return this._customMask;
  }
  set customMask(val: string) {
    this._customMask = val;
    if (this.wijmoInputCtrl) {
      this.wijmoInputCtrl.mask = val;
    }
  }

  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() invalid: boolean = false;

  private _customMask: string;

  cardType: string;
  cardTypeClass: any = {
    fa: true,
    'fa-credit-card': true
  };
  private wijmoInputCtrl: any;

  constructor() { }

  ngOnInit() {
    this.cardValueChange = this.cardValueChange.bind(this);
  }

  ngAfterViewInit() {
    this.wijmoInputCtrl = new window['wijmo'].input.InputMask(this.inputEle.nativeElement);
    this.wijmoInputCtrl.placeholder = this.placeholder;
    this.wijmoInputCtrl.isDisabled = !!this.disabled;
    this.wijmoInputCtrl.inputElement.readOnly = !!this.readonly;
    if (this.customMask) {
      this.wijmoInputCtrl.mask = this.customMask;
    }
    setTimeout(() => {
      if (!this.innerValue) return;
      this.wijmoInputCtrl.rawValue = this.innerValue;
    });
    this.wijmoInputCtrl.valueChanged.addHandler(this.cardValueChange);
  }

  ngOnDestroy() {
    this.wijmoInputCtrl && this.wijmoInputCtrl.dispose();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.wijmoInputCtrl) return;
    this.wijmoInputCtrl.isDisabled = !!this.disabled;
    this.wijmoInputCtrl.inputElement.readOnly = !!this.readonly;
    if (this.customMask) {
      this.wijmoInputCtrl.mask = this.customMask;
    }
  }

  writeValue(obj: string): void {
    let value = obj ? obj.toString() : obj;
    if (this.innerValue !== value) {
      if (this.wijmoInputCtrl) {
        setTimeout(() => {
          this.wijmoInputCtrl.rawValue = value;
        });
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private cardValueChange(sender: any) {
    this.cardType = this._getCreditCardType(sender.rawValue);
    if (!this.customMask) {
      this.wijmoInputCtrl.mask = this._getMaskType(this.cardType);
    }
    this.cardTypeClass = {
      fa: true,
      'fa-credit-card': this.cardType === 'unknown',
      'fa-cc-mastercard': this.cardType === 'mastercard',
      'fa-cc-visa': this.cardType === 'visa',
      'fa-cc-amex': this.cardType === 'amex',
      'fa-cc-diners-club': this.cardType === 'diners',
      'fa-cc-discover': this.cardType === 'discover',
      'fa-cc-jcb': this.cardType === 'jcb'
    }    
    this.innerValue = sender.rawValue;
    this.onChange(this.innerValue);
  }

  private _getMaskType(cardType: string) {
    let masks = {
      'mastercard': '0000 0000 0000 0000',
      'visa': '0000 0000 0000 0000',
      'amex': '0000 000000 00000',
      'diners': '0000 0000 0000 00',
      'discover': '0000 0000 0000 0000',
      'jcb': '0000 0000 0000 0000',
      'unknown': '0000 0000 0000 0000'
    };
    return masks[cardType];
  }

  private _getCreditCardType(creditCardNumber: string) {
    let result = "unknown";
    if (/^5[1-5]/.test(creditCardNumber)) {
      result = "mastercard";
    } else if (/^4/.test(creditCardNumber)) {
      result = "visa";
    } else if (/^3[47]/.test(creditCardNumber)) {
      result = "amex";
    } else if (/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(creditCardNumber)) {
      result = "diners"
    } else if (/6(?:011|5[0-9]{2})[0-9]{12}/.test(creditCardNumber)) {
      result = "discover";
    } else if (/^35((28)|(29)|([3-8]{1,1}[0-9]{1,1})){1,1}/.test(creditCardNumber)) {
      result = 'jcb';
    }
    return result;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'credit-card-demo',
  templateUrl: './credit-card-demo.html'
})

export class CreditCardDemoPage {

  cardNumber: string;
  cardNumber2: string = '35298';
  cardNumber3: string = '13123123'

  constructor() { }

  ngOnInit() { }
}

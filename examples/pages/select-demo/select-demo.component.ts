import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'select-demo',
  templateUrl: 'select-demo.component.html'
})

export class SelectDemoComponent implements OnInit {

  selectedValue: any;
  selectedValue2 = 'Item2';

  public selectOptions: Array<any>;

  ngOnInit() {
    this.selectOptions = [];
    let i = 0;
    while (i < 10) {
      this.selectOptions.push('Item' + i);
      i++;
    }
  }
}

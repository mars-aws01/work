import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'select-demo',
  templateUrl: 'select-demo.component.html'
})

export class SelectDemoComponent implements OnInit {

  public selectOptions = (function () {
    let arr = [];
    let i = 20;
    while (i--) {
      arr.push('Item' + i);
    }
    return arr;
  })();
  ngOnInit() { }
}

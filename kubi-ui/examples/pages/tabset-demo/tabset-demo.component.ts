import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tabset-demo',
  templateUrl: 'tabset-demo.component.html'
})

export class TabsetDemoComponent implements OnInit {

  public selected: string = 'tabpane-1';

  public tabs = [{
    header: 'Tab1'
  }, {
    header: 'Tab2'
  }];

  ngOnInit() { }

  public consoleChangeEvent(val: any) {
    console.log(val);
  }

  addTab() {
    this.tabs.length < 5 && this.tabs.push({ header: 'Tab_' + (Math.floor(Math.random() * 100)) });
  }

  removeTab() {
    this.tabs.length > 1 && this.tabs.splice(0, 1);
  }
}

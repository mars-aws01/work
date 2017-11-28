import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fixbar-demo',
  templateUrl: 'fixbar-demo.component.html'
})

export class FixbarDemoComponent implements OnInit {

  public fixbarItems = [{
    title: 'Add Paragraph', icon: 'fa fa-plus', fn: () => {
      this.testClick()
    }
  }];

  ngOnInit() { }

  public testClick() {
    alert('click fixbar');
  }

}

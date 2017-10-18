import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'switch-demo',
  templateUrl: 'switch-demo.component.html'
})

export class SwitchDemoComponent implements OnInit {

  public checked: boolean = false;

  ngOnInit() { }

  public toggleChecked() {
    this.checked = !this.checked;
  }
}

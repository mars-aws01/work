import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkbox-demo',
  templateUrl: 'checkbox-demo.component.html'
})

export class CheckboxDemoComponent implements OnInit {

  public checked: boolean = false;

  ngOnInit() { }

  public toggleChecked() {
    this.checked = !this.checked;
  }
}

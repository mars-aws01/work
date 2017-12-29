import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radio-demo',
  templateUrl: 'radio-demo.component.html'
})

export class RadioDemoComponent implements OnInit {

  public sex: string = 'Male';

  ngOnInit() { }

  public toggleSex() {
    this.sex = this.sex === 'Male' ? 'Female' : 'Male';
  }

  public handleRadioClick() {
    alert('click');
  }
}

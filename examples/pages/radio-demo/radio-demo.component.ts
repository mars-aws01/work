import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radio-demo',
  templateUrl: 'radio-demo.component.html'
})

export class RadioDemoComponent implements OnInit {

  public sex: string = '男';

  ngOnInit() { }

  public toggleSex() {
    this.sex = this.sex === '男' ? '女' : '男';
  }
}

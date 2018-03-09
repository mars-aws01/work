import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-demo',
  templateUrl: 'button-demo.component.html'
})

export class ButtonDemoComponent implements OnInit {

  ngOnInit() { }

  handleBtnClick() {
    alert('您点击了按钮');
  }
}

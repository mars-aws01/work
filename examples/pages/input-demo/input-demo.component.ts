import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'input-demo',
  templateUrl: 'input-demo.component.html'
})

export class InputDemoComponent implements OnInit {

  public inputValue: string = '';

  ngOnInit() { }

  public handleIconClick(evt: MouseEvent) {
    alert('icon被点击');
  }
}

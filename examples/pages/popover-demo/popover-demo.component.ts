import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popover-demo',
  templateUrl: 'popover-demo.component.html'
})
export class PopoverDemoComponent implements OnInit {
  public content: string = '哈哈哈哈';
  public allowHtml: boolean = false;
  ngOnInit() {}

  public handleBtnClick() {
    alert('按钮被点击');
  }
}

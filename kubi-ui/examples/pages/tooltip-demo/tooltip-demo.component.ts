import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tooltip-demo',
  templateUrl: 'tooltip-demo.component.html'
})
export class TooltipDemoComponent implements OnInit {
  public tooltipContent: string = '哈哈哈哈';
  public allowHtml: boolean = false;
  ngOnInit() {}
}

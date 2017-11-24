import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radio-group-demo',
  templateUrl: 'radio-group-demo.component.html'
})

export class RadioGroupDemoComponent implements OnInit {

  public sex = '男';
  public sexList = ['男', '女', '人妖', '保密'];
  public val2 = 'B';
  
  ngOnInit() { }

}

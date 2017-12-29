import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radio-group-demo',
  templateUrl: 'radio-group-demo.component.html'
})

export class RadioGroupDemoComponent implements OnInit {

  public sex = 'Male';
  public sexList = ['Male', 'Female', 'Unknown'];
  
  ngOnInit() { }

}

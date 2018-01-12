import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'input-demo',
  templateUrl: 'input-demo.component.html'
})

export class InputDemoComponent implements OnInit {

  public inputValue: string = '';
  public inputValue2: any = 123456;
  public inputValue3: any = 123456;
  public inputValue4: number;

  ngOnInit() { }

  public handleIconClick(evt: MouseEvent) {
    alert('icon clicked');
  }

  onBlur(evt: any) {
    console.log('onBlur fired');
  }
}

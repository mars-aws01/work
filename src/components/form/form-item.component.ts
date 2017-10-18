import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'nk-form-item',
  templateUrl: 'form-item.component.html'
})

export class FormItemComponent implements OnInit {

  @Input() control: FormControl | NgModel;

  ngOnInit() { }
}

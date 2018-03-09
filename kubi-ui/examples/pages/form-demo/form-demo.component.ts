import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'form-demo',
  templateUrl: 'form-demo.component.html'
})

export class FormDemoComponent implements OnInit {

  data1 = {
    Company: 'Newegg Group',
    Name: '',
    Address: '2721 Calle Colima West Convina, Los Angeles'
  }

  data2 = {
    Company: '',
    Name: '',
    Address: '2721 Calle Colima West Convina, Los Angeles'
  }

  ngOnInit() { }

  submitForm(form: any) {
    
  }
}

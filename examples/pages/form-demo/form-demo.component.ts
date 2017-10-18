import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'form-demo',
  templateUrl: 'form-demo.component.html'
})

export class FormDemoComponent implements OnInit {

  public v1: string = 'abc';

  ngOnInit() { }

  public submitForm(form: any) {
    var valid = form.validateForm();
    if (valid) {
      alert('pass');
    }
  }
}

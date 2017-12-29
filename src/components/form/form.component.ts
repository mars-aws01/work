import './form.component.styl';

import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'nk-form',
  templateUrl: 'form.component.html',
  exportAs: 'nkForm'
})

export class FormComponent implements OnInit {

  @Input() labelWidth: string = '';
  @Input() inline: boolean = true;

  @ViewChild('nkForm') form: NgForm;

  ngOnInit() { }

  public validateForm() {    
    Object.keys(this.form.controls).forEach(k => {
      this.form.controls[k].markAsDirty();
    });
    return this.form.valid;
  }
}

import './form.component.styl';

import { Component, HostBinding, Input, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'nk-form',
  templateUrl: 'form.component.html',
  exportAs: 'nkForm'
})

export class FormComponent implements OnInit {

  @Input() labelWidth: string = '';
  @Input() inline: boolean = true;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nkForm') form: NgForm;
  @ViewChild('submitBtn') submitBtn: ElementRef;

  public get submitted(): boolean {
    if (this.form) {
      return this.form.submitted;
    } else {
      return false;
    }
  }

  constructor() { }

  ngOnInit() { }

  public validateForm() {
    Object.keys(this.form.controls).forEach(k => {
      this.form.controls[k].markAsDirty();
    });
    return this.form.valid;
  }

  public submit() {
    this.submitBtn.nativeElement.click();
  }

  public resetForm() {
    this.form && this.form.resetForm();
  }

  _innerSubmit() {
    this.onSubmit.emit(this.form);
  }
}

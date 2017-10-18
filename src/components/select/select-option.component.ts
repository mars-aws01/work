import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { SelectComponent } from './select.component';

@Component({
  selector: 'nk-option',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'select-option.component.html'
})

export class SelectOptionComponent implements OnInit, OnDestroy {

  @Input() label: string;
  @Input() value: string;
  @Input() disabled: boolean = false;

  constructor(private select: SelectComponent) {

  }
  ngOnInit() {
    this.select.addOption(this);
  }

  ngOnDestroy() {
    this.select.removeOption(this);
  }
}

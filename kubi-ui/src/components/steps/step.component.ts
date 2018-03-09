import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { StepsComponent } from './steps.component';
import { removeAngularTag } from '../../core/utils';

@Component({
  selector: 'nk-step',
  templateUrl: 'step.component.html'
})

export class StepComponent implements OnInit {
  @ViewChild('titleRef') titleRef: ElementRef

  @Input() title: string
  @Input() description: string
  @Input() icon: string
  @Input() status: string

  isSimple: boolean;
  isLast: boolean;
  direction: string;
  currentStatus: string;
  index: number = 1;
  mainOffset: string = '0px';

  constructor() {
  }

  ngOnInit() {

  }
}

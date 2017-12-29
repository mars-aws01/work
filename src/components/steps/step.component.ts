import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { StepsComponent } from './steps.component';
import { removeAngularTag } from '../../core/utils';

@Component({
  selector: 'nk-step',
  templateUrl: 'step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepComponent implements OnInit {
  @ViewChild('titleRef') titleRef: ElementRef

  @Input() title: string
  @Input() description: string
  @Input() icon: string
  @Input() status: string

  index: number = 1;
  mainOffset: string = '0px';

  constructor( @Optional() public parent: StepsComponent, private el: ElementRef, private sanitizer: DomSanitizer) {
  }

  currentStatus(): string {
    if (this.parent.active > this.index) {
      return this.parent.finishStatus
    }
    if (this.parent.active === this.index) {
      return this.parent.processStatus
    }
    return 'wait'
  }

  isLast(): boolean {
    return this.parent.stepsLength - 1 === this.index
  }

  isVertical(): boolean {
    return this.parent.direction === 'vertical'
  }

  ngOnInit(): void {
    this.index = + this.el.nativeElement.getAttribute('nk-index');
    if (this.parent.direction === 'horizontal' && this.parent.alignCenter) {
      const width: number = this.titleRef.nativeElement.getBoundingClientRect().width;
      this.mainOffset = width / 2 + 16 + 'px';
    }
    removeAngularTag(this.el.nativeElement);
  }
}

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

  public get stepClass() {
    console.log(this.isLast());
    return {
      [`is-${this.parent.direction}`]: !this.parent.simple,
      ['is-center']: this.parent.alignCenter && !this.parent.simple && !this.isVertical(),
      ['is-flex']: this.isLast() && !this.parent.alignCenter && !this.parent.simple
    };
  }

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

  makeStepStyles(): SafeStyle {
    const space: string | number = this.parent.space
    const width: string = typeof space === 'number' ? `${space}px` : space
      ? String(space) : `${100 / (this.parent.stepsLength - 1)}%`
    const lastStyles: string = this.isLast()
      ? `max-width: ${100 / this.parent.stepsLength}%;`
      : `margin-right: ${this.parent.offset}px;`
    const styles: string = `flex-basis: ${width}; ${lastStyles}`
    return this.sanitizer.bypassSecurityTrustStyle(styles)
  }

  makeLineStyles(): SafeStyle {
    const step: number = this.index === this.parent.active - 1
      ? (this.currentStatus() !== 'error' ? 50 : 0)
      : this.currentStatus() === 'wait' ? 0 : 100
    const delay: string = (this.parent.processStatus === 'wait' ? -1 : 1) * 150 * this.index + 'ms'
    const key = this.parent.direction === 'vertical' ? 'height' : 'width'
    const styles = `border-width: ${step ? '1px' : 0}; ${key}: ${step}%; transition-delay: ${delay};`
    return this.sanitizer.bypassSecurityTrustStyle(styles)
  }


  isLast(): boolean {
    return this.parent.stepsLength - 1 === this.index
  }

  isVertical(): boolean {
    return this.parent.direction === 'vertical'
  }

  ngOnInit(): void {
    this.index = + this.el.nativeElement.getAttribute('nk-index');
    console.log(this.index);
    if (this.parent.direction === 'horizontal' && this.parent.alignCenter) {
      const width: number = this.titleRef.nativeElement.getBoundingClientRect().width;
      this.mainOffset = width / 2 + 16 + 'px';
    }
    removeAngularTag(this.el.nativeElement);
  }
}

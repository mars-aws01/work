import './steps.component.styl';

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'nk-steps',
  templateUrl: 'steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepsComponent implements OnInit {

  @Input()
  get space(): string | number {
    return null;
  }//  ex: 10px, 50%
  set space(value: string | number) {
    console.warn("[nk-steps] 'space' property has expired");
  }
  @Input() direction: string = 'horizontal'     // enum: vertical/horizontal
  @Input() active: number = 0
  @Input()
  get simple(): boolean {
    return false;
  }

  @Input('process-status')
  get processStatus(): string {
    return 'process';
  }
  set processStatus(value: string) {
    console.warn("[nk-steps] 'process-status' property has expired");
  }
  @Input('finish-status')
  get finishStatus(): string {
    return 'finish';     // enum: wait/process/finish/error/success
  }
  set finishStatus(value: string) {
    console.warn("[nk-steps] 'finish-status' property has expired");
  }
  @Input('align-center')
  get alignCenter(): boolean {
    return false;
  }
  set alignCenter(value: boolean) {
    console.warn("[nk-steps] 'align-center' property has expired");
  }

  offset: number = 0;
  stepsLength: number = 0;

  public get stepsClass() {
    const c = {
      [`nk-steps--${this.direction}`]: !this.simple      
    };    
    return c;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    const children = this.elementRef.nativeElement.querySelectorAll('nk-step')
    if (!children || !children.length) {
      return console.warn('steps components required children')
    }
    children.forEach((el: HTMLElement, index: number) => {
      this.renderer.setAttribute(el, 'nk-index', String(index))
    })
    this.stepsLength = children.length
  }
}

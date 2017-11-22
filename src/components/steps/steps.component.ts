import './steps.component.styl';

import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'nk-steps',
  templateUrl: 'steps.component.html'
})

export class StepsComponent implements OnInit {

  @Input() space: string | number                       //  ex: 10px, 50%
  @Input() direction: string = 'horizontal'     // enum: vertical/horizontal
  @Input() active: number = 0
  @Input() simple: boolean = false
  @Input('process-status') processStatus: string = 'process'
  @Input('finish-status') finishStatus: string = 'finish'     // enum: wait/process/finish/error/success
  @Input('align-center') alignCenter: boolean = false

  offset: number = 0
  stepsLength: number = 0

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    // const children = this.elementRef.nativeElement.querySelectorAll('el-step')
    // if (!children || !children.length) {
    //   return console.warn('steps components required children')
    // }
    // children.forEach((el: HTMLElement, index: number) => {
    //   this.renderer.setAttribute(el, 'el-index', String(index))
    // })
    // this.stepsLength = children.length
  }
}

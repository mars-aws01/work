import './steps.component.styl';

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ContentChild, QueryList, forwardRef, ViewChildren, ContentChildren } from '@angular/core';
import { StepComponent } from './step.component';

@Component({
  selector: 'nk-steps',
  templateUrl: 'steps.component.html'
})

export class StepsComponent implements OnInit {

  @ContentChildren(StepComponent)
  stepsCtrl: QueryList<StepComponent>;

  @Input()
  get space(): string | number {
    return null;
  }
  set space(value: string | number) {
    console.warn("[nk-steps] 'space' property has expired");
  }
  @Input() direction: string = 'horizontal'
  @Input()
  get active(): number {
    return this._active;
  }
  set active(val: number) {
    if (val < 0) val = 0;
    this._active = val;
    this._initStep();
  }
  private _active: number = 0
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

  public get stepsClass() {
    const c = {
      [`nk-steps--${this.direction}`]: !this.simple
    };
    return c;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
  }

  private _stepSubscriber: any;
  ngAfterContentInit() {
    this._stepSubscriber = this.stepsCtrl.changes.subscribe(() => {
      setTimeout(() => {
        this._initStep();
      });
    });
    this._initStep();
  }

  ngOnDestroy() {
    this._stepSubscriber && this._stepSubscriber.unsubscribe();
  }

  private _initStep() {
    if (!this.stepsCtrl) return;
    this.stepsCtrl.toArray().forEach((x, i) => {
      x.isSimple = this.simple;
      x.direction = this.direction;
      x.index = i;
      let _currentStatus = 'wait';
      if (this.active > i) {
        _currentStatus = this.finishStatus;
      } else if (this.active === i) {
        _currentStatus = this.processStatus;
      }
      x.currentStatus = _currentStatus;
    });
  }
}

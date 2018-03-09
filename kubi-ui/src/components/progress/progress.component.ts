import './progress.component.styl';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nk-progress',
  templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnInit, OnChanges {
  public barWidth: string;
  public barHeight: string;

  @Input()
  public align: string = ''; // 可选['', 'right', 'bottom']

  @Input()
  public striped: boolean = false; // 条纹

  @Input()
  public active: boolean = false; // 激活的

  @Input()
  public size: string = ''; // 尺寸，可选['micro', 'xs', 'sm', '', 'lg']

  @Input()
  public maxValue: number = 100; // 最大值

  @Input()
  public type: string = 'primary'; // 类型，可选['danger', 'warning', 'success', 'info', 'primary']

  @Input()
  public class: string = ''; // 自定义class

  @Input()
  public value: number; // 给定的value

  public get barClass() {
    let classArr = [];
    if (this.type) {
      classArr.push(`progress-bar-${this.type}`);
    }
    if (this.size) {
      classArr.push(`progress-${this.size}`);
    }
    if (this.align) {
      classArr.push(this.align);
    }
    if (this.striped) {
      classArr.push('progress-bar-striped');
    }
    if (this.active) {
      classArr.push('active');
    }
    if (this.class) {
      classArr.push(this.class);
    }
    return classArr.join(' ');
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value || changes.maxValue) {
      this.calcBarWidthOrHeight();
    }
  }

  private calcBarWidthOrHeight(): void {
    let per = this.value / this.maxValue * 100;
    if (per !== per) { // Is NaN
      this.barWidth = null;
      this.barHeight = null;
      return;
    }
    if (per > 100) {
      per = 100;
    }
    this.barWidth = `${per}%`;
  }
}

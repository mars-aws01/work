import './button.component.styl';

import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nk-button',
  templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {

  @ViewChild('buttonEle')
  buttonEle: ElementRef;

  @Input()
  get type(): string {
    return this._type;
  }
  set type(val: string) {
    this._type = val;
    this._updateButtonClass();
  }
  private _type: string = 'normal';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = !!val;
    this._updateButtonClass();
  }
  private _disabled: boolean = false;

  @Input()
  get width(): string | number {
    return this._width;
  }
  set width(val: string | number) {
    this._width = val;
    this._updateButtonStyle();
  }
  private _width: string | number = '';

  @Input() icon: string; // Set icon class  
  @Input() mode: string = 'button';

  buttonClass = {
    'nk-button-disabled': false,
    'nk-button-primary': false,
    'nk-button-danger': false
  }

  constructor(
    private renderer2: Renderer2) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._updateButtonStyle();
  }

  private _updateButtonClass() {
    this.buttonClass['nk-button-disabled'] = this.disabled;
    this.buttonClass['nk-button-primary'] = this.type === 'primary';
    this.buttonClass['nk-button-danger'] = this.type === 'danger';
  }

  private _updateButtonStyle() {
    if (!this.buttonEle) return;
    if (this.width) {
      let width = this.width + (typeof this.width === 'number' ? 'px' : '');
      this.renderer2.setStyle(this.buttonEle.nativeElement, 'width', width);
    } else {
      this.renderer2.setStyle(this.buttonEle.nativeElement, 'width', null);
    }
  }
}

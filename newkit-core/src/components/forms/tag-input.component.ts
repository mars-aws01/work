import { Component, OnInit, forwardRef, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';

export const TAG_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagInputComponent),
  multi: true
};

@Component({
  selector: 'nk-tag-input',
  templateUrl: 'tag-input.component.html',
  providers: [TAG_INPUT_VALUE_ACCESSOR]
})
export class TagInputComponent extends ComponentBase implements OnInit {

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  private tags: Array<string> = [];
  private $el: any;
  private inputValue: string = '';

  private get inputSize() {
    return Math.max(this.placeholder.length, this.inputValue.length);
  }

  @Input()
  private placeholder: string = 'Type tag';

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
  }

  public addTag(evt) {
    if (evt.keyCode === 13) { // Enter
      let val = this.inputValue.trim();
      if (val && this.tags.indexOf(val) < 0) { // 有值，且不存在
        this.tags.push(val);
        this.inputValue = '';
        this.notifyValueChange();
      }
    }
  }

  private notifyValueChange() {
    this.onChange(this.tags);
  }

  public removeTag(idx) {
    this.tags.splice(idx, 1);
    this.notifyValueChange();
  }

  public writeValue(value: any): void {
    this.tags = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
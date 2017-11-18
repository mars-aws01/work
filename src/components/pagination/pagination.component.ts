import './pagination.component.styl';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PAGINATION_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true
};

const MAX_PAGE_BUTTON_COUNT = 10;

@Component({
  selector: 'nk-pagination',
  templateUrl: 'pagination.component.html',
  providers: [PAGINATION_VALUE_ACCESSOR]
})

export class PaginationComponent implements ControlValueAccessor, OnInit, OnChanges {

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;
  public paginationClass: string = '';
  public pageIndex: number = 1;
  public pages: Array<any> = [];
  public inputValue: number = this.pageIndex;

  @Input() totalCount: number = 0;
  @Input() simpleMode: boolean = false;
  @Input() pageSize: number = 20;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public get pageCount() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let pageIndex = Math.min(this.pageIndex, this.pageCount);
    if (pageIndex !== this.pageIndex) {
      this.emitValue(pageIndex);
    }
  }

  public handleInputBlur(val: number) {
    this.inputValue = this.pageIndex;
  }

  public handleEnterInput(evt: KeyboardEvent) {
    if (evt.keyCode !== 13) {
      return;
    }
    const val = +this.inputValue;
    if (val !== val) {
      return;
    }
    this.pageClick(val);
  }

  pageClick(p: number) {
    if (p < 1 || p > this.pageCount) { return; }
    this.emitValue(p);
  }

  private emitValue(value: number) {
    this.inputValue = this.pageIndex = value;
    this.onChange(value);
    this.onPageChange.next(value);
    if (!this.simpleMode) {
      this.buildPages();
    }
  }

  private buildPages() {
    let result = [];
    let startIndex;
    let endIndex;
    let needHead = false;
    let needFoot = false;
    if (this.pageCount <= MAX_PAGE_BUTTON_COUNT) {
      startIndex = 1;
      endIndex = this.pageCount;
    } else {
      if (this.pageCount - this.pageIndex < MAX_PAGE_BUTTON_COUNT) { // 在最后10页内
        endIndex = this.pageCount;
        startIndex = this.pageCount - MAX_PAGE_BUTTON_COUNT + 1;
        needHead = true;
      } else { // 常规
        startIndex = (Math.ceil(this.pageIndex / MAX_PAGE_BUTTON_COUNT) - 1) * MAX_PAGE_BUTTON_COUNT + 1;
        endIndex = startIndex + MAX_PAGE_BUTTON_COUNT - 1;
        if (this.pageIndex > MAX_PAGE_BUTTON_COUNT) {
          needHead = true;
        }
        needFoot = true;
      }
    }
    for (let i = startIndex; i <= endIndex; i++) {
      result.push({ value: i, text: i });
    }
    if (needHead) {
      result.unshift({ text: '...', value: startIndex - 1, });
    }
    if (needFoot) {
      result.push({ text: '...', value: endIndex + 1 });
    }
    this.pages = result;
  }

  public writeValue(value: any): void {
    let pageIndex = Math.min(Math.max(1, +value), this.pageCount);
    this.inputValue = pageIndex;
    this.pageIndex = this.inputValue;
    if (!this.simpleMode) {
      this.buildPages();
    }
  }
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}

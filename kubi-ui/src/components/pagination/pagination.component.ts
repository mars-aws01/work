import './pagination.component.styl';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { setTimeout } from 'timers';

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

export class PaginationComponent implements ControlValueAccessor, OnInit {

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;
  public paginationClass: string = '';
  public pageIndex: number = 1;
  public pages: Array<any> = [];

  // Deprecated
  @Input() simpleMode: boolean = false;

  @Input() showTotalCount: boolean = true;
  @Input()
  get totalCount(): any {
    return this._totalCount;
  }
  set totalCount(val: any) {
    this._totalCount = parseInt(val, 10) || 0;
    this.buildPages();
  }
  private _totalCount: number = 0;

  @Input() allowPageSize = false;
  @Input() pageSizeList: number[] = [10, 20, 50];
  @Input()
  get pageSize(): any {
    return this._pageSize;
  }
  set pageSize(val: any) {
    val = parseInt(val, 10);
    if (this.pageSizeList.indexOf(val) === -1) return;
    this._pageSize = parseInt(val, 10);
    this.buildPages();
  }
  private _pageSize: number = 20;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();

  public get pageCount() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  ngOnInit() {
  }

  setPage(type: string) {
    let totalPage = this.pages[this.pages.length - 1];
    let pageIndex = this.pageIndex;
    switch (type) {
      case 'start':
        pageIndex = 1;
        break;
      case 'prev':
        if (pageIndex > 1)
          pageIndex--;
        break;
      case 'next':
        if (pageIndex < totalPage)
          pageIndex++;
        break;
      case 'end':
        pageIndex = totalPage;
        break;
    }
    if (this.pageIndex === pageIndex) return;
    this.pageIndex = pageIndex;
    this.pageClick(this.pageIndex);
  }

  onPageSizeSelectChange(val: number) {
    this.pageSize = val;
    this.onPageSizeChange.emit(val);
  }

  pageClick(p: number) {
    if (p < 1 || p > this.pageCount) { return; }
    this.emitValue(p);
  }

  private emitValue(value: number) {
    this.pageIndex = value;
    this.onChange(value);
    this.onPageChange.next(value);
  }

  private _buildPagesTimer: any;
  private buildPages() {
    if (this._buildPagesTimer) clearTimeout(this._buildPagesTimer);
    this._buildPagesTimer = setTimeout(() => {
      let arr: Array<any> = [];
      for (let i = 1; i <= this.pageCount; i++) {
        arr.push(i);
      }
      this.pages = arr;
    }, 100);
  }

  public writeValue(value: any): void {
    value = Math.max(1, Math.abs(+value));
    let pageIndex = Math.min(value, this.pageCount);
    if (pageIndex !== this.pageIndex) {
      this.emitValue(pageIndex);
    }
    this.pageIndex = pageIndex;
  }
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}

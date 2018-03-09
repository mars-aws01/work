import { Component, forwardRef, OnInit, Input, Output, OnChanges, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';

export const DROP_LIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropListComponent),
  multi: true
};
const MAX_PAGE_BUTTON_COUNT = 5;
@Component({
  selector: 'nk-drop-list',
  templateUrl: 'drop-list.component.html',
  providers: [DROP_LIST_VALUE_ACCESSOR]
})
export class DropListComponent extends ComponentBase implements OnInit {

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  private innerDataSource = [];
  private $el: any;
  private innerValue: any;

  @Input()
  private dataSource: Array<any>;


  //分页下拉
  private inputFocused: boolean = false;
  private filterChanged: boolean;
  private focusedIndex: number = -1;
  private pages: Array<any> = [];
  private pageIndex: number = 1;
  private pageCount: number = 1;
  private totalCount: number = 0;
  private _pageSize: number;
  private filterKey: string = '';

  @Input()
  private set pageSize(val) {
    this._pageSize = Math.floor(Math.max(1, val));
  }
  @Output()
  private pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    super();
    super.watch('innerValue', (newVal, oldValue) => {
      if (_.isEqual(newVal, oldValue)) {
        return;
      }
      this.onChange(newVal);
    });
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'smart-form';
    super.watch('innerValue', (newVal, oldValue) => {
      this.onChange(this.innerValue);
    })
    this.totalCount = this.dataSource.length;
    this.innerDataSource = this.dataSource.slice(0, this._pageSize);
  }

  ngOnChanges(changesObj) {
    if (changesObj.totalCount || changesObj.pageSize) {
      this.calcPageInfo();
      this.innerDataSource = this.dataSource.slice((this.pageIndex - 1) * this._pageSize, (this.pageIndex) * this._pageSize);
    }
  }


  private pageClick(event, p) {
    event.stopPropagation();
    event.preventDefault();
    this.inputFocused = true;
    if (p < 1) { return; }
    if (p > this.pageCount) { return; }
    this.pageIndex = p;
    this.emitValue();
    this.buildPages();
    this.dataChange(p);
    this.focusedIndex = -1;
  }


  public writeValue(value: any): void {
    this.pageIndex = Math.max(1, +value);
    this.buildPages();
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private emitValue() {
    this.onChange(this.pageIndex);
    this.pageChanged.next(this.pageIndex);
  }

  private dataChange(p) {
    if (p < 1) { return; }
    if (p > this.pageCount) { return; }
    if (p == 1) {
      this.innerDataSource = this.dataSource.slice(0, this._pageSize);
    } else {
      this.innerDataSource = this.dataSource.slice((p - 1) * this._pageSize, p * this._pageSize);
    }
  }

  private inputKeyDown(event: any) {
    if (!event) return;
    if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) return;
    event.stopPropagation();
    event.preventDefault();
    if (event.keyCode === 13) {
      this.inputFocused = false;
      this.focusedIndex = -1;
      return;
    }
    if (event.keyCode === 38) {
      this.focusedIndex--;
      if (this.focusedIndex < 0) {
        this.focusedIndex = this.innerDataSource.length - 1;
      }
    }
    if (event.keyCode === 40) {
      this.focusedIndex++;
      if (this.focusedIndex > this.innerDataSource.length - 1) {
        this.focusedIndex = 0;
      }
    }
    let selectedItem = this.innerDataSource[this.focusedIndex];
    this.filterKey = selectedItem;
  }

  private inputFocus() {
    this.inputFocused = true;
    this.focusedIndex = -1;
    this.calcPageInfo();

  }
  private inputBlur(event) {
    this.inputFocused = false;
  }

  private setFocusIndex(index) {
    this.focusedIndex = index;
  }

  private itemMouseDown(event) {
    event.preventDefault();
  }

  private itemSelect(item: any) {
    this.filterKey = item;
    this.inputFocused = false;
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
      if (this.pageCount - this.pageIndex < MAX_PAGE_BUTTON_COUNT) {
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

  private calcPageInfo() {
    this.pageCount = Math.ceil(this.totalCount / this._pageSize);
    this.buildPages();
    if (this.pageIndex > this.pageCount) {
      this.pageIndex = this.pageCount;
      this.buildPages();
      setTimeout(() => {
        this.emitValue();
      });
    }
  }
}

import './grid.component.styl';

import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

import { GridColumnDirective } from './grid-column.directive';

@Component({
  selector: 'nk-grid',
  templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit, OnChanges {

  @ViewChild('tableHeader') tableHeader: ElementRef;
  @ViewChild('tableBody') tableBody: ElementRef;

  private columns: Array<any> = [];
  private _pageIndex: number = 1;

  private dataItems: Array<any> = [];

  private get _totalCount() {
    return this.serverPaging ? this.totalCount : this.data.length;
  }
  private get _pageIndexArr() {
    let arr = [];
    let totalPages = Math.ceil(this._totalCount / this.pageSize);
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }

  @Input()
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(v) {
    if (this._pageIndex === v) return;
    this._pageIndex = v;
    this.setDataItems();
    this.pageIndexChange.next(v);
  }
  @Output()
  pageIndexChange: EventEmitter<any> = new EventEmitter();

  private get currentEndIdx() {
    return Math.min(this.pageSize * this.pageIndex, this._totalCount);
  }

  sortable: boolean = false;
  sortableColumns: Array<any>;
  sortField: string;
  sortOrder: string = 'asc';

  @Input()
  get data(): Array<any> {
    return this.innerData;
  };
  set data(val: Array<any>) {
    this.innerData = val ? window['_'].cloneDeep(val) : [];
    setTimeout(() => {
      this.updateFixedHeaderWidth();
    }, 200);
  }
  private innerData: Array<any> = [];

  @Input() pageable: boolean = false;
  @Input() pageSizeList = [10, 20, 50];
  @Input() showPageSizeList: boolean = true;
  @Input() pageSize: number = 20;
  @Input() serverPaging: boolean = false;
  @Input() totalCount: number = 0;
  @Input() maxHeight: number = 0;

  @Input()
  get defaultSortField(): string {
    return this.sortField;
  };
  set defaultSortField(value: string) {
    this.sortField = value;
  };

  @Input()
  get defaultSortOrder(): string {
    return this.sortOrder;
  }
  set defaultSortOrder(value: string) {
    this.sortOrder = value || 'asc';
  }

  @Output() onSorting: EventEmitter<any> = new EventEmitter();
  @Output() onPaging: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onPageSizeChanged: EventEmitter<any> = new EventEmitter();

  @ContentChildren(GridColumnDirective)
  private set columnTemplates(val: QueryList<GridColumnDirective>) {
    if (val) {
      this.columns = val.toArray();
      let sortableColumns = val.toArray().filter(x => x.sortable).map(x => {
        return {
          header: x.header,
          field: x.field
        }
      });
      this.sortable = sortableColumns.length > 0;
      this.sortableColumns = sortableColumns;
    } else {
      this.sortable = false;
      this.sortableColumns = null;
    }
    setTimeout(() => {
      this.updateFixedHeaderWidth();
    }, 200);
  }

  @HostListener('window:resize')
  _onWindowResize() {
    this.updateFixedHeaderWidth();
  }

  private _intervalId: any;
  private _isVisible: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {

  }

  ngOnInit() {
    this.updateFixedHeaderPos = this.updateFixedHeaderPos.bind(this);
  }

  ngAfterViewInit() {
    this.updateFixedHeaderWidth();
    this.tableBody.nativeElement.parentElement.addEventListener('scroll', this.updateFixedHeaderPos);

    this._intervalId = setInterval(() => {
      let elem = this.el.nativeElement;
      let isVisible = !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      if (this._isVisible !== isVisible) {
        this._isVisible = isVisible;
        if (isVisible) {
          setTimeout(() => {
            this.updateFixedHeaderWidth();
          }, 200);
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.tableBody.nativeElement.parentElement.removeEventListener('scroll', this.updateFixedHeaderPos);
    clearInterval(this._intervalId);
  }

  dataRowRepeatDone() {
    this.updateFixedHeaderWidth();
    this.updateFixedHeaderPos();
  }

  updateFixedHeaderWidth() {
    if (!this.tableHeader || !this.tableBody) return;
    let tableHeader = this.tableHeader.nativeElement;
    let tableBody = this.tableBody.nativeElement;
    let fixedThs = tableHeader.querySelectorAll('thead>tr:first-child>th');
    let originalThs = tableBody.querySelectorAll('thead>tr:first-child>th');
    if (fixedThs.length !== originalThs.length) return;
    let len = originalThs.length;
    for (let i = 0; i < len; i++) {
      let width = originalThs[i].dataset.width || 'auto';
      if (originalThs[i].offsetWidth > 0) {
        width = originalThs[i].offsetWidth + 'px';
      }
      this.renderer.setStyle(fixedThs[i], 'width', width);
    }
    let scrollbarWidth = tableBody.parentElement.offsetWidth - tableBody.parentElement.clientWidth;
    if (scrollbarWidth > 0) {
      let last = len - 1;
      this.renderer.setStyle(fixedThs[last], 'width', originalThs[last].offsetWidth + scrollbarWidth + 'px');
    }
    this.updateFixedHeaderPos();
  }

  updateFixedHeaderPos() {
    if (!this.tableHeader || !this.tableBody) return;
    let tableHeader = this.tableHeader.nativeElement;
    let tableBodyContainer = this.tableBody.nativeElement.parentElement;
    if (tableBodyContainer.scrollLeft === 0 && !tableHeader.style.marginLeft) return;
    this.renderer.setStyle(tableHeader, 'marginLeft', -tableBodyContainer.scrollLeft + 'px');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.setDataItems();
    }
  }

  onHeaderClick(column: any) {
    if (!column.sortable) return;
    if (this.sortField === column.field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = column.field;
    }
    this.emitSortChanged(this.sortField, column.header, this.sortOrder);
  }

  onSortFieldChanged(value: any) {
    this.sortField = value;
    if (!this.sortOrder) this.sortOrder = this.defaultSortOrder || 'asc';
    let column = this.columns.filter(c => c.field === value);
    this.emitSortChanged(value, column[0].header, this.sortOrder);
  }

  onSortOrderChanged(value: any) {
    let column = this.columns.filter(c => c.field === this.sortField);
    this.sortOrder = value;
    this.emitSortChanged(this.sortField, column[0].header, value);
  }

  private emitSortChanged(field: string, header: string, sort: string) {
    this.onSorting.next({
      field: field,
      header: header,
      sort: sort
    });
    setTimeout(() => {
      this.setDataItems();
    });
  }

  onPageIndexChanged(value: any) {
    if (this.pageIndex === value) return;
    this.pageIndex = value;
    this.onPaging.next({ pageIndex: this.pageIndex });
  }

  setPage(type: string) {
    let totalPage = this._pageIndexArr.pop();
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
    this.onPaging.next({ pageIndex: this.pageIndex });
  }

  public onPageSizeSelectChange(val: number) {
    this.pageSize = val;
    this.onPageSizeChanged.next({ pageSize: val });
    this.setDataItems();
  }

  public rowClick(rowData: any, evt: MouseEvent) {
    this.onRowClick.emit(rowData);
  }

  private setDataItems() {
    if (!this.serverPaging && this.pageable) {
      let result = [];
      let startIdx = this.pageSize * (this.pageIndex - 1);
      let endIdx = Math.min(startIdx + this.pageSize, this.data.length);
      for (let i = startIdx; i < endIdx; i++) {
        result.push(this.data[i]);
      }
      this.dataItems = result;
    } else {
      this.dataItems = this.data;
    }
  }
}

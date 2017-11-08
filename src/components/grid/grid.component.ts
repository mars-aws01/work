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
  SimpleChanges
} from '@angular/core';

import { GridColumnDirective } from './grid-column.directive';

@Component({
  selector: 'nk-grid',
  templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit, OnChanges {
  private columns: Array<any> = [];
  private _pageIndex: number = 1;

  private dataItems: Array<any> = [];

  private get _totalCount() {
    return this.serverPaging ? this.totalCount : this.data.length;
  }

  private get pageIndex() {
    return this._pageIndex;
  }
  private set pageIndex(v) {
    this._pageIndex = v;
    this.setDataItems();
    this.onPaging.next({ pageIndex: v });
  }

  private get currentEndIdx() {
    return Math.min(this.pageSize * this.pageIndex, this._totalCount);
  }

  @Input() data: Array<any> = [];
  @Input() pageable: boolean = false;
  @Input() pageSizeList = [10, 20, 50];
  @Input() showPageSizeList: boolean = true;
  @Input() pageSize: number = 20;
  @Input() serverPaging: boolean = false;
  @Input() totalCount: number = 0;

  @Output() onSorting: EventEmitter<any> = new EventEmitter();
  @Output() onPaging: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onPageSizeChanged: EventEmitter<any> = new EventEmitter();

  @ContentChildren(GridColumnDirective)
  private set columnTemplates(val: QueryList<GridColumnDirective>) {
    if (val) {
      this.columns = val.toArray();
    }
  }

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.setDataItems();
    }
  }

  public getHeaderClass(column: GridColumnDirective) {
    return {
      sorting: column.sortable,
      sorting_desc: column.sort === 'desc',
      sorting_asc: column.sort === 'asc',
      [column.headerClass]: true
    };
  }

  public onPageSizeSelectChange(val: number) {
    this.pageSize = val;
    this.onPageSizeChanged.next(val);
  }

  public onHeaderClick(column: any) {
    if (column.sortable) {
      for (let c of this.columns) {
        if (c !== column) {
          c.sort = '';
        }
      }
      switch (column.sort) {
        case '':
        case 'desc':
          column.sort = 'asc';
          break;
        case 'asc':
          column.sort = 'desc';
          break;
      }
      this.onSorting.next({
        field: column.field,
        header: column.header,
        sort: column.sort
      });
      setTimeout(() => {
        this.setDataItems();
      });
    }
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

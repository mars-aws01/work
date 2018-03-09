import { OnChanges, OnInit } from '@angular/core';
export declare class GridComponent implements OnInit, OnChanges {
    private columns;
    private _pageIndex;
    private dataItems;
    private readonly _totalCount;
    private pageIndex;
    private readonly currentEndIdx;
    private dataSource;
    private pageable;
    private pageSizeList;
    private showPageSizeList;
    private pageSize;
    private serverPaging;
    private totalCount;
    private columnTemplates;
    private onSorting;
    private onPaging;
    private onRowClick;
    private onPageSizeChanged;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    onPageSizeSelectChange(val: any): void;
    onHeaderClick(column: any): void;
    rowClick(rowData: any, evt: any): void;
    private setDataItems();
}

import { EventEmitter, OnChanges, OnInit } from '@angular/core';
export declare class CollapseBoxComponent implements OnInit, OnChanges {
    innerCollapsed: boolean;
    header: string;
    collapsed: boolean;
    collapsedChange: EventEmitter<boolean>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    onHeaderClick(): void;
}

import { OnInit } from '@angular/core';
export declare class TreeItemComponent implements OnInit {
    private treeItem;
    private treeOpt;
    private itemClick;
    constructor();
    ngOnInit(): void;
    private onChildItemClick($event, item);
}

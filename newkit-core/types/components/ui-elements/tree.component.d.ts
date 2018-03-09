import { OnInit } from '@angular/core';
import { NegUtil } from './../../services';
export declare class TreeComponent implements OnInit {
    private negUtil;
    private treeData;
    private showIcon;
    private showCheckbox;
    private single;
    private value;
    private valueChange;
    private itemClick;
    constructor(negUtil: NegUtil);
    ngOnInit(): void;
    private processTreeData(arr);
    ngOnChanges(changesObj: any): void;
    private setItemState();
    private selectItems(itemArr, valueArr);
    private onItemClick(item);
    private cancelAllItemSelect(itemArr);
}

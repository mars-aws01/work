import { OnChanges, OnInit } from '@angular/core';
export declare class AlertComponent implements OnInit, OnChanges {
    private innerClass;
    private shown;
    private shownChange;
    private showCloseBtn;
    private type;
    private onClose;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    btnCloseClick(): void;
    private setInnerClass();
}

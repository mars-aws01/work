import { OnChanges, OnInit } from '@angular/core';
export declare class ProgressComponent implements OnInit, OnChanges {
    private barClass;
    private barWidth;
    private align;
    private vertical;
    private striped;
    private active;
    private size;
    private maxValue;
    private type;
    private class;
    private value;
    private bgColorClass;
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    private calcBarWidth();
    private calcBarClass();
}

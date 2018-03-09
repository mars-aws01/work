import { ElementRef, OnInit } from '@angular/core';
export declare class WidgetComponent implements OnInit {
    private elementRef;
    private allowColors;
    private widgetColorClass;
    private fullScreenMode;
    private widgetCollapsed;
    private hasCustomHeader;
    private hasCustomToolbar;
    private header;
    private icon;
    private showCollapseBtn;
    private showFullscreenBtn;
    private showPickColorBtn;
    private defaultColor;
    private customHeader;
    private customToolbar;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changesObj: any): void;
    changeWidgetColor(color: any): string;
    toggleFullScreen(): void;
    toggleCollapse(): void;
}

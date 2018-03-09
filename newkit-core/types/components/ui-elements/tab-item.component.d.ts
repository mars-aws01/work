import { OnInit, AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
import { TabsetComponent } from './tabset.component';
export declare class TabItemComponent extends ComponentBase implements OnInit, AfterViewInit {
    private elementRef;
    private renderer;
    private tabset;
    active: boolean;
    header: string;
    icon: string;
    constructor(elementRef: ElementRef, renderer: Renderer, tabset: TabsetComponent);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}

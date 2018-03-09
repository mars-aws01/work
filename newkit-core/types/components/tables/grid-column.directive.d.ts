import { OnInit, TemplateRef } from '@angular/core';
export declare class GridColumnDirective implements OnInit {
    private readonly styleWidth;
    sort: string;
    private header;
    private field;
    private width;
    private sortable;
    cellTemplate: TemplateRef<any>;
    ngOnInit(): void;
}

import { OnInit } from '@angular/core';
export interface FixbarItem {
    title: string;
    icon: string;
    fn: Function;
}
export declare class FixbarComponent implements OnInit {
    private items;
    ngOnInit(): void;
    onItemClick(item: any, evt: any): void;
}

import { ElementRef } from '@angular/core';
import { NegEventBus } from './../../services';
export declare class FunctionPanelComponent {
    private negEventBus;
    sysFuncPanel: ElementRef;
    expandFuncPanel: boolean;
    constructor(negEventBus: NegEventBus);
    ngOnInit(): void;
    toggleMenuStatus(): void;
    showFeedback(): void;
    toggleFuncPanel(): void;
}

import { NegEventBus } from './negEventBus';
export declare class NegMultiTab {
    private negEventBus;
    constructor(negEventBus: NegEventBus);
    openPage(path: string, queryParams?: any, newTab?: boolean): void;
    setCurrentTabName(value: any): void;
    private processMultiLang(value);
}

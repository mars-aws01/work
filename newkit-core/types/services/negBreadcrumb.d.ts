import { NegEventBus } from './negEventBus';
export declare class NegBreadcrumb {
    private negEventBus;
    constructor(negEventBus: NegEventBus);
    setBreadcrumbs(breadcrumbs: any): void;
    setLastBreadcrumb(lastBreadcrumb: any): void;
    private processBreadcrumb(breadcrumb);
}

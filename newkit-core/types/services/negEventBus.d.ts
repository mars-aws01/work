import { Subscription } from 'rxjs';
export declare class NegEventBus {
    constructor();
    emit(eventName: string, data?: any): boolean;
    on(eventName: string, handler: Function): Subscription;
    once(eventName: any, handler: Function): void;
}

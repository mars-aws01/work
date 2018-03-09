import { NegTranslate } from './negTranslate';
export declare class NegMessageBox {
    private negTranslate;
    private _wrapper;
    private _instances;
    constructor(negTranslate: NegTranslate);
    info(message: string, title?: string, callback?: Function, userOpt?: {}): string;
    success(message: string, title?: string, callback?: Function, userOpt?: {}): string;
    warn(message: string, title?: string, callback?: Function, userOpt?: {}): string;
    error(message: string, title?: string, callback?: Function, userOpt?: {}): string;
    alert(message: string, title?: string, callback?: Function, userOpt?: any): string;
    confirm(message: string, title?: string, okCallback?: Function, cancelCallback?: Function, userOpt?: any): string;
    close(id: string): void;
    closeAll(): void;
    private _showMessageBox(opt);
    private _onBoxClose(id);
    private _checkWarpper();
}

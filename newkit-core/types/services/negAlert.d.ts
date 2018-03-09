import { NegUtil } from './negUtil';
import { NegTranslate } from './negTranslate';
import { NegMessageBox } from './negMessageBox';
export declare class NegAlert {
    private negUtil;
    private negTranslate;
    private negMessageBox;
    private messageBox;
    constructor(negUtil: NegUtil, negTranslate: NegTranslate, negMessageBox: NegMessageBox);
    info(message: string, callback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    success(message: string, callback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    warn(message: string, callback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    error(message: string, callback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    alert(message: string, callback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    confirm(message: string, okCallback?: Function, cancelCallback?: Function, userOpt?: {}, useMessenger?: boolean): any;
    _getBackdrop(): any;
    show(message: string, userOpt?: {}): any;
    _post(options: any, backdrop?: any): any;
    close(ins: any): void;
    closeAll(): void;
    notify(content: string, callback?: Function, userOpt?: {
        title?: string;
        type?: string;
        color?: string;
        icon?: string;
        timeout?: number;
    }): void;
    _notify(opt: any, userOpt: any): void;
}

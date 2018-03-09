import { NegAuth } from './negAuth';
import { NegAjax } from './negAjax';
export declare class NegBizLog {
    private negAuth;
    private negAjax;
    constructor(negAuth: NegAuth, negAjax: NegAjax);
    /**
     * 记录EventTrace
     * @param {key} 常用key [ 'visit' | 'click' ]
     * @param {bizData} 是业务数据，原样存储
     * @param {keyData} 可选的关键数据，会把数据进行平铺存储
     * @param {label} 可选标识，如 Button 名字
     */
    log(key: string, bizData: any, keyData?: Object, label?: string): void;
    tracePageView(): void;
    _commitData(data: any): void;
}

import { NegAjax } from './../services/negAjax';
import { NegUtil } from './../services/negUtil';
export declare class NegGlobalConfig {
    private negAjax;
    private negUtil;
    constructor(negAjax: NegAjax, negUtil: NegUtil);
    /**
     * 加载指定domain的global config数据
     * @param {string} domain - 指定的Domain
     * @param {boolean} force? - 是否强制请求（默认会检查是否存在）
     * @returns {Promise}
     */
    load(domain: string, force?: boolean): Promise<any>;
    /**
     * 获取指定的Config数据
     * @param  {string} domain - 指定Domain
     * @param  {string} key - 指定要获取的Key
     * @param  {boolean} force? - 是否强制获取最新数据
     */
    get(domain: string, key: string, force?: boolean): Promise<any>;
}

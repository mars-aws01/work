import { NegAjax } from './../services/negAjax';
import { NegUtil } from './../services/negUtil';
export declare class NegConfigService {
    private negAjax;
    private negUtil;
    constructor(negAjax: NegAjax, negUtil: NegUtil);
    /**
     * 加载config services.
     * @param  {string} system - 系统名称
     * @param  {string} key - 系统中的key
     * @param  {string} hashKey - 系统名称和key拼接的一个key
     * @param  {boolean} force? - 是否强制获取最新数据
     * @returns {Promise}
     */
    _load(system: string, key: string, hashKey: string, force: boolean, hideLoading: boolean): Promise<any>;
    /**
     * 获取指定system和key的config数据
     * @param  {string} system - 系统名称
     * @param  {string} key - 系统中的key
     * @param  {boolean} force? - 强制获取最新数据
     * @returns {Promise}
     */
    get(system: string, key: string, force?: boolean, hideLoading?: boolean): Promise<any>;
    /**
     * 批量获取config数据
     * @param  {Array<string>} paths - 系统名称. e.g. ['/system/config1', 'system/config2']
     * @returns {Promise}
     */
    batchQuery(paths: Array<string>, hideLoading?: boolean): Promise<any>;
}

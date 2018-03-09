import { Injectable } from '@angular/core';

import { NegAjax } from './../services/negAjax';
import { NegUtil } from './../services/negUtil';

const configServiceMap: Map<string, any> = new Map<string, any>();

@Injectable()
export class NegConfigService {

  constructor(private negAjax: NegAjax, private negUtil: NegUtil) { }
  /**
   * 加载config services.
   * @param  {string} system - 系统名称
   * @param  {string} key - 系统中的key
   * @param  {string} hashKey - 系统名称和key拼接的一个key
   * @param  {boolean} force? - 是否强制获取最新数据
   * @returns {Promise}
   */
  _load(system: string, key: string, hashKey: string, force: boolean, hideLoading: boolean): Promise<any> {
    let url = `${NewkitConf.configServiceAddress}/${this.negUtil.encodeUri(system)}/${this.negUtil.encodeUri(key)}`;
    return new Promise((resolve, reject) => {
      if (!force) {
        if (configServiceMap.has(hashKey)) {
          return resolve(true);
        }
      }
      this.negAjax.get(url, { hideLoading: !!hideLoading })
        .then(({ data }) => {
          configServiceMap.set(hashKey, data);
          resolve(true);
        })
        .catch(reason => reject(reason));
    });
  }
  /**
   * 获取指定system和key的config数据
   * @param  {string} system - 系统名称
   * @param  {string} key - 系统中的key
   * @param  {boolean} force? - 强制获取最新数据
   * @returns {Promise}
   */
  get(system: string, key: string, force?: boolean, hideLoading?: boolean): Promise<any> {
    if (!system) {
      throw new Error('system param required.');
    }
    if (!key) {
      throw new Error('key param required.');
    }
    let hashKey = `${system}+|*|+${key}`;
    return new Promise((resolve, reject) => {
      this._load(system, key, hashKey, force, hideLoading)
        .then(() => {
          let config = configServiceMap.get(hashKey);
          if (config) {
            return resolve(config.configValue);
          }
          resolve(null);
        })
        .catch(reason => reject(reason));
    });
  }
  /**
   * 批量获取config数据
   * @param  {Array<string>} paths - 系统名称. e.g. ['/system/config1', 'system/config2']
   * @returns {Promise}
   */
  batchQuery(paths: Array<string>, hideLoading?: boolean): Promise<any> {
    if (!paths || paths.length === 0) {
      throw new Error('paths param required and cannot be null or empty.');
    }
    return new Promise((resolve, reject) => {
      let url = `http://localhost:8484/eggkeeper/v1/batch-query`;
      this.negAjax.post(url, paths, { hideLoading: !!hideLoading })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(reason => reject(reason));
    });
  }
}

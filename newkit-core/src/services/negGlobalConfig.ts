import { Injectable } from '@angular/core';

import { NegAjax } from './../services/negAjax';
import { NegUtil } from './../services/negUtil';

const globalConfigMap: Map<string, Array<any>> = new Map<string, Array<any>>();

@Injectable()
export class NegGlobalConfig {

  constructor(private negAjax: NegAjax, private negUtil: NegUtil) { }

  /**
   * 加载指定domain的global config数据
   * @param {string} domain - 指定的Domain
   * @param {boolean} force? - 是否强制请求（默认会检查是否存在） 
   * @returns {Promise} 
   */
  load(domain: string, force?: boolean): Promise<any> {
    if (!domain) {
      throw new Error('domain param required.');
    }
    let encodeDomain = this.negUtil.encodeUri(domain);
    let url = `${NewkitConf.APIGatewayAddress}/framework/v1/global-configuration?domain=${encodeDomain}`;
    return new Promise((resolve, reject) => {
      if (!force) {
        if (globalConfigMap.has(domain)) {
          return resolve(true);
        }
      }
      this.negAjax.get(url)
        .then(({data}) => {
          globalConfigMap.set(domain, data);
          resolve(true);
        })
        .catch(reason => reject(reason));
    });
  }

  /**
   * 获取指定的Config数据
   * @param  {string} domain - 指定Domain
   * @param  {string} key - 指定要获取的Key
   * @param  {boolean} force? - 是否强制获取最新数据
   */
  get(domain: string, key: string, force?: boolean): Promise<any> {
    if (!domain) {
      throw new Error('domain param required.');
    }
    if (!key) {
      throw new Error('key param required.');
    }
    return new Promise((resolve, reject) => {
      this.load(domain, force)
        .then(() => {
          let domainConfig = globalConfigMap.get(domain);
          let config = domainConfig.find(x => x.Key === key);
          if (config) {
            return resolve(config.Value);
          }
          resolve(null);
        }).catch(reason => reject(reason));
    });
  }
}

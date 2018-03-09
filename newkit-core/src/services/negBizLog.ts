import { Injectable } from '@angular/core';

import { NegAuth } from './negAuth';
import { NegAjax } from './negAjax';

@Injectable()
export class NegBizLog {

  constructor(private negAuth: NegAuth, private negAjax: NegAjax) { }

  /**
   * 记录EventTrace
   * @param {key} 常用key [ 'visit' | 'click' ]
   * @param {bizData} 是业务数据，原样存储
   * @param {keyData} 可选的关键数据，会把数据进行平铺存储
   * @param {label} 可选标识，如 Button 名字
   */
  log(key: string, bizData: any, keyData?: Object, label?: string) {
    let userId: string;
    try {
      userId = this.negAuth.userId;
    } catch (e) {
      userId = 'System';
    }
    let postData: any = Object.assign({
      key,
      userId: userId,
      createDate: Date.now(),
      pageUrl: location.pathname + location.hash,
      label: label
    }, keyData || {});
    postData.data = bizData;
    this._commitData(postData);
  }

  tracePageView() {
    this.log('visit', null);
  }

  _commitData(data) {
    let NewkitConf = window['NewkitConf'];
    this.negAjax.post(`${NewkitConf.NewkitAPI}/bizlog`, data, { hideLoading: true })
      .then(() => {

      })
      .catch(err => { });
  }
}
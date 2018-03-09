import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NegAuth, NegAjax } from '@newkit/core';

@Injectable()
export class GlobalSearchService {

  GlobalSearchSub = new ReplaySubject<any>(1);
  private _cache: any;
  private ajaxOpt: any;

  constructor(
    private negAuth: NegAuth,
    private negAjax: NegAjax) {
    this.ajaxOpt = { headers: { 'x-newkit-token': this.negAuth.authData.newkitToken } };
  }

  getGlobalSearchSettings(disableCache: boolean = false) {
    return new Promise((resolve, reject) => {
      if (!disableCache && this._cache) {
        return resolve(this._cache);
      }
      let url = `${NewkitConf.NewkitAPI}/global-search`;
      this.negAjax.get(url, this.ajaxOpt)
        .then(res => {
          this._cache = res.data;
          this.GlobalSearchSub.next(res.data);
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }

  addGlobalSearchSetting(globalSearchInfo: any) {
    return new Promise((resolve, reject) => {
      let url = `${NewkitConf.NewkitAPI}/global-search`;
      this.negAjax.post(url, globalSearchInfo, this.ajaxOpt)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  updateGlobalSearchSetting(id: string, globalSearchInfo: any) {
    return new Promise((resolve, reject) => {
      let url = `${NewkitConf.NewkitAPI}/global-search/${id}`;
      this.negAjax.put(url, globalSearchInfo, this.ajaxOpt)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  deleteGlobalSearchSetting(id: string) {
    return new Promise((resolve, reject) => {
      let url = `${NewkitConf.NewkitAPI}/global-search/${id}`;
      this.negAjax.delete(url, this.ajaxOpt)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }
}

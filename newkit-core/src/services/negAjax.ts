import { Headers, Http, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { NegAlert } from './negAlert';
import { NegGlobalLoading } from './negGlobalLoading';

const ajaxDefaults = {
  headers: {
    'Accept': 'application/json'
  }
};

@Injectable()
export class NegAjax {

  private requestCount = 0;

  constructor(
    private http: Http,
    private negGlobalLoading: NegGlobalLoading,
    private negAlert: NegAlert
  ) {
  }

  public get(url: string, options?: any): Promise<any> {
    return this._request('GET', url, null, options);
  }

  public post(url: string, body: any, options?: any): Promise<any> {
    return this._request('POST', url, body, options);
  }

  public put(url: string, body: any, options?: any): Promise<any> {
    return this._request('PUT', url, body, options);
  }

  public delete(url: string, options?: any): Promise<any> {
    return this._request('DELETE', url, null, options);
  }

  public setCommonHeaders(headers: { [key: string]: string }) {
    Object.assign(ajaxDefaults.headers, headers);
  }

  public removeCommonHeader(headerKey: string) {
    delete ajaxDefaults.headers[headerKey];
  }

  private _buildOptions(options, type) {
    options = options || {};
    let tmpHeader = {};
    if (type !== 'GET' && type !== 'DELETE') {
      tmpHeader['Content-Type'] = 'application/json';
    }
    let headers = new Headers(Object.assign({}, ajaxDefaults.headers, tmpHeader, options.headers || {}));
    let requestOptions = new RequestOptions({
      headers: headers
    });
    // 一个错别字导致的兼容处理
    requestOptions['useCustomErrorHandler'] = !!(options.useCustomErrorHandler || options.useCustomErrorHander);
    requestOptions['hideLoading'] = !!options.hideLoading;
    return requestOptions;
  }

  private _request(type, url, body, options) {
    options = options || {};
    let p;
    switch (type) {
      case 'GET':
        p = this.http.get(url, this._buildOptions(options, 'GET'));
        break;
      case 'POST':
        p = this.http.post(url, body, this._buildOptions(options, 'POST'));
        break;
      case 'PUT':
        p = this.http.put(url, body, this._buildOptions(options, 'PUT'));
        break;
      case 'DELETE':
        p = this.http.delete(url, this._buildOptions(options, 'DELETE'));
        break;
      default:
        throw new Error('Not Supported Method');
    }
    if (!options.hideLoading) {
      this.requestCount += 1;
      this._processLoading();
    }

    return p.toPromise()
      .then(res => {
        if (!options.hideLoading) {
          this.requestCount -= 1;
          this._processLoading();
        }
        let result = { data: this._tryGetJsonData(res), res };
        return result;
      }).catch(errRes => {
        if (!options.hideLoading) {
          this.requestCount -= 1;
          this._processLoading();
        }
        if (!options.useCustomErrorHandler) {
          this._handlerError(errRes);
        }
        return Promise.reject(errRes);
      });
  }

  private _tryGetJsonData(res) {
    try {
      return res.json();
    } catch (ex) {
      return res.text();
    }
  }

  private _handlerError(errRes: any) {
    errRes = errRes || {};
    let errMessage;
    switch (errRes.status) {
      case 0:
        errMessage = `Error, status is ${errRes.status}`;
        break;
      case 404:
        errMessage = errRes.text();
        break;
      case 500:
        let data = this._tryGetJsonData(errRes);
        if (typeof data === 'object') {
          errMessage = data.error ? data.error.message : data.message;
        } else {
          errMessage = data;
        }
        break;
      default:
        if (errRes.text) {
          errMessage = errRes.text();
        } else {
          errMessage = '[NegAjax] Unkown Error';
          if (window['NEWKIT_DEBUG']) {
            console.log(errRes);
          }
        }
        break;
    }
    if (errMessage) {
      this.negAlert.error(errMessage);
    }
  }

  private _processLoading() {
    if (this.requestCount > 0) {
      this.negGlobalLoading.show();
    } else {
      this.negGlobalLoading.hide();
    }
  }
};

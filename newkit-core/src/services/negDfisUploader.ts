import { Injectable } from '@angular/core';
import { NegAuth } from './negAuth';

@Injectable()
export class NegDfisUploader {

  constructor(private negAuth: NegAuth) { }

  _upload(dfisUrl: string, file: Blob | File, headers = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', dfisUrl);
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            return reject(xhr.statusText);
          }
          resolve(dfisUrl);
        }
      });
      xhr.addEventListener('error', (err) => {
        reject(err);
      });
      xhr.send(file);
    });
  }

  /**
   * 上传文件到dfis
   * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
   * @param  {Blob|File} file - 要上传的内容
   */
  upload(dfisUrl: string, file: Blob | File): Promise<any> {
    return this._upload(dfisUrl, file, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  /**
   * 上传文件到dfis
   * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
   * @param  {Blob|File} file - 要上传的内容
   */
  uploadForLL(dfisUrl: string, file: Blob | File): Promise<any> {
    let token = this.negAuth.newkitToken;
    let headers = {
      Authorization: token,
      'x-newkit-token': token
    };
    return this._upload(dfisUrl, file, headers);
  }
}

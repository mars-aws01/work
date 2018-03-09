declare var NewkitConf: any;

import { Injectable } from '@angular/core';
import { NegAjax } from './negAjax';
import { NegStorage } from './negStorage';

@Injectable()
export class NegAuth {

  private _authData: any;
  private _userProfile: any;
  private _authorizedUrls: Array<any> = [];
  private _isAuthenticated: boolean = false;
  private _noPermissionMenus: Array<any> = [];

  constructor(
    private negAjax: NegAjax,
    private negStorage: NegStorage
  ) {
  }

  public setAuthData(authData): void {
    this._authData = authData;
    this._authData.newkitToken = this.negStorage.cookie.get('x-newkit-token');
    this._isAuthenticated = true;
    this._processAuthDataForNoPermissionMenus(authData.menus);
  }

  private _processAuthDataForNoPermissionMenus(menus, unauthorized = false) {
    menus.forEach(item => {
      let hasPermission = true;
      if (item.AuthorizeType === 'keystone') {
        let funArr = (item.FunctionName || '').split(',');
        hasPermission = !!this._authData.functions.find(x => x.ApplicationId.toString() === item.ApplicationId.toString() && funArr.includes(x.Name));
      }
      if (unauthorized || !hasPermission) {
        if (item.subMenus && item.subMenus.length > 0) { // 如果不是叶子节点
          this._processAuthDataForNoPermissionMenus(item.subMenus, true);
        } else {
          this._noPermissionMenus.push(item.Url);
        }
      } else { // 有权限，判断是否是叶子节点
        if (item.subMenus && item.subMenus.length > 0) {
          // 非叶子节点
          this._processAuthDataForNoPermissionMenus(item.subMenus);
        } else {
          this._authorizedUrls.push(item.Url);
        }
      }
    });
  }

  public canVisitUrl(url: string) {
    return this._authorizedUrls.includes(url);
  }

  public setAuthorizedUrls(authorizedUrls): void {
    this._authorizedUrls = authorizedUrls;
  }

  public get authData() {
    return this._authData;
  }

  public get user() {
    return this.authData.userInfo;
  }

  public get userId() {
    return this.user.UserID;
  }

  public get displayName() {
    return this.user.DisplayName;
  }

  public get newkitToken() {
    return this.authData.newkitToken;
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public isAuthorizedPath(path: string): boolean {
    return this._authorizedUrls.indexOf(path) >= 0;
  }

  /**
   * 通过AppId获取token
   * @param  {number} appId
   * @returns Promise
   */
  public getOAuthToken(appId): Promise<any> {
    let postData = {
      username: this.userId,
      client_id: appId
    };
    let newkitToken = this.newkitToken;
    if (newkitToken) {
      return this.negAjax.post(`${NewkitConf.NewkitAPI}/token`, postData, { headers: { 'x-newkit-token': newkitToken } })
        .then(({ data }) => {
          return data.access_token;
        });
    } else {
      return Promise.reject(new Error('Must login'));
    }
  }

  /**
   * 通过用户ID获取token
   */
  public getTokenByWithRole(): Promise<any> {
    return this.negAjax.get(`${NewkitConf.APIGatewayAddress}/apiservice/v1/auth/basic/token/${this.userId}`)
      .then(({ data }) => {
        return data.Token;
      });
  }

  /**
   * 检查用户权限
   * @param  {string} appId AppId
   * @param  {string} functionName 权限名称
   * @returns boolean
   */
  public hasFunction(appId: string, functionName: string): boolean {
    let userFunctions = this.authData.functions || [];
    for (let fun of userFunctions) {
      if (fun.ApplicationId === appId && fun.Name === functionName) {
        return true;
      }
    }
    return false;
  }
  /**
   * 检查用户权限
   * @param  {string} appName app名称
   * @param  {string} functionName 权限名称
   * @returns boolean
   */
  public hasFunctionByAppName(appName: string, functionName: string): boolean {
    let appId = NewkitConf.Applications[appName];
    if (!appId) {
      return false;
    }
    return this.hasFunction(appId, functionName);
  }
  /**
   * 检查用户权限
   * @param  {string} functionName 权限名称
   * @returns boolean
   */
  public hasFunctionByName(functionName: string): boolean {
    let userFunctions = this.authData.functions || [];
    for (let fun of userFunctions) {
      if (fun.Name === functionName) {
        return true;
      }
    }
    return false;
  }
}

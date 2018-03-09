import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NegAjax, NegAuth, NegEventBus, NegStorage, NegUserProfile, NegUtil } from '@newkit/core';

import { Injectable } from '@angular/core';

const NEWKIT_TOKEN_COOKIE_NAME = 'x-newkit-token';

@Injectable()
export class AuthService {

  private isFirstRoute: boolean = true;

  private denyUrls = [];

  constructor(
    private router: Router,
    private negAuth: NegAuth,
    private negAjax: NegAjax,
    private negStorage: NegStorage,
    private negUtil: NegUtil,
    private negEventBus: NegEventBus,
    private negUserProfile: NegUserProfile
  ) { }

  public canVisitUrl(url: string) {
    return !this.denyUrls.includes(url);
  }

  checkDomainPass(userId: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (NewkitConf.env === 'gdev' || NewkitConf.env === 'gqc') {
        if (userId === 'superuser') {
          if (password === 'superuser') {
            return resolve({ data: { Result: true } });
          } else {
            return resolve({ data: { Result: false, AccountStatus: {} } });
          }
        }
      }
      let url = `${NewkitConf.APIGatewayAddress}/common/v1/domain/security/authentication`;
      let body = {
        UserName: userId,
        Password: password
      }
      this.negAjax.put(url, body)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  login(ssoToken: string): Promise<boolean | void> {
    let postData = {
      SSOToken: ssoToken,
      ApplicationIds: Object.keys(NewkitConf.Applications).map(key => NewkitConf.Applications[key])
    };
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/login`, postData)
      .then(({ res }) => {
        return this._processLoginData(res);
      }).catch(reason => true);
  }

  userLogin(userModel): Promise<void> {
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/userlogin`, userModel)
      .then(({ res }) => {
        return this._processLoginData(res);
      }).catch(err => {
        this.negStorage.cookie.remove(NEWKIT_TOKEN_COOKIE_NAME);
        return Promise.reject(err);
      });
  }

  autoLogin(newkitToken: string): Promise<void> {
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/autologin`, null, { headers: { [NEWKIT_TOKEN_COOKIE_NAME]: newkitToken }, useCustomErrorHandler: true })
      .then(({ res }) => {
        return this._processLoginData(res, true);
      })
      .catch(err => {
        this.negStorage.cookie.remove(NEWKIT_TOKEN_COOKIE_NAME);
        return Promise.reject(err);
      });
  }

  requireAuth(to: RouterStateSnapshot, from: ActivatedRouteSnapshot, router: Router): Promise<boolean> {
    if (this.negAuth.isAuthenticated()) {
      return Promise.resolve(true);
    } else {
      this.negStorage.local.set('newkit_redirect_url', window.location.pathname + window.location.search + window.location.hash);
      router.navigateByUrl('/login');
      return Promise.resolve(false);
    }
  }

  _processLoginData(res, isAutoLogin: boolean = false) {
    let token: string = res.headers.get(NEWKIT_TOKEN_COOKIE_NAME) || this.negStorage.cookie.get(NEWKIT_TOKEN_COOKIE_NAME);
    if (!isAutoLogin) {
      this.negStorage.cookie.set(NEWKIT_TOKEN_COOKIE_NAME, token, 1);
    }
    this.negAjax.setCommonHeaders({ Authorization: token });
    let data = res.json();
    let authData = {
      userInfo: data.UserInfo,
      roleAttributes: data.RoleAttributes,
      roles: data.Roles,
      functions: data.Functions,
      menus: data.MenuData,
      globalSearch: data.globalSearch,
      neweggPermission: data.NeweggPermission,
      denyUrls: data.DenyUrls || []
    };
    this.denyUrls = data.DenyUrls || [];
    let ga = window['ga'];
    ga && ga('set', '&uid', authData.userInfo.UserID);
    this.negStorage.local.set('x-newkit-authorize', authData);
    this.negAuth.setAuthData(authData);
    return this.negUserProfile.init(this.negAuth.userId)
  }
}

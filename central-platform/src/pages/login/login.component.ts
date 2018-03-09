import { Component, OnInit } from '@angular/core';
import { NegAjax, NegStorage, NegUtil } from '@newkit/core';

import { AuthService } from './../../services';
import { Router } from '@angular/router';

require('./login.component.styl');

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public useLoginPage: boolean = false;

  public userModel: { UserName: string, Password: string, RememberMe: boolean } = {
    UserName: '',
    Password: '',
    RememberMe: false
  };

  constructor(
    private router: Router,
    private negUtil: NegUtil,
    private negStorage: NegStorage,
    private authService: AuthService,
    private negAjax: NegAjax
  ) { }

  ngOnInit() {
    let userName = this.negStorage.local.get('remember_username');
    if (userName) {
      this.userModel.RememberMe = true;
      this.userModel.UserName = userName;
    }
    this.autoLogin();
  }

  public doUserLogin(evt) {
    evt.preventDefault();
    this.authService.userLogin(this.userModel)
      .then(() => {
        if (this.userModel.RememberMe) {
          this.negStorage.local.set('remember_username', this.userModel.UserName);
        }
        this.loginComplete();
      });
  }

  loginComplete() {
    let redirectUrl: string = this.negStorage.local.get('newkit_redirect_url') || '';
    this.negStorage.local.remove('newkit_redirect_url');
    if (redirectUrl.startsWith('/login')) {
      redirectUrl = '/';
    }
    this.router.navigateByUrl(redirectUrl || '/');
  }

  autoLogin() {
    let newkitToken = this.negStorage.cookie.get('x-newkit-token');
    let p: Promise<any>;
    if (newkitToken) {
      p = this.authService.autoLogin(newkitToken);
    } else {
      p = Promise.reject(false);
    }
    p.then(() => this.loginComplete())
      .catch(() => this.login());
  }

  login() {
    this.useLoginPage = !!NewkitConf.useLoginPage;
    if (!this.useLoginPage) {
      let t = this.negUtil.getQuery('t');
      if (t) {
        this.authService.login(t)
          .then(() => {
            this.loginComplete();
          });
      } else {
        this.ssoLogin();
      }
    }
  }

  ssoLogin() {
    let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${this.negUtil.getBaseUrl(window.location)}/login`;
    window.location.href = ssoLoginUrl;
  }
}
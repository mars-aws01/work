import { NegAuth, NegGlobalLoading } from '@newkit/core';

import { Injectable } from '@angular/core';
import { LayoutComponent } from './../pages';

@Injectable()
export class MessageProcessor {

  private app: LayoutComponent;

  constructor(private globalLoading: NegGlobalLoading, private negAuth: NegAuth) {
    this._init();
  }

  init(app: LayoutComponent) {
    this.app = app;
  }

  _init() {
    const centralClient = window['centralClient'];
    const NProgress = window['NProgress'];
    // 处理页面进度条
    centralClient.on('$changeProgressShown', shown => {
      if (shown) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    });
    // 处理Loading进度条
    centralClient.on('$changeLoadingShown', shown => {
      if (shown) {
        this.globalLoading.show();
      } else {
        this.globalLoading.hide();
      }
    });
    //处理iframe页面高度变化
    // centralClient.on('$childHeightChange', height => {
    //   $('#iframe-for-ng1-page').css({height: `${height}px`});
    // });
    // 处理子页面路由变化
    centralClient.on('$childRouteChangeSuccess', route => {
      this.app.router.navigate(['/system/newkitjs'], { fragment: route });
    });
    // 处理授权信息拉取
    centralClient.on('$childPullAuthInfo', (value, source) => {
      centralClient.postMessage('$pushAuthInfo', this.app.negAuth.authData, source);
    });
  }

  sendMessage(target: any, messageKey: string, messageValue: any = null) {
    const centralClient = window['centralClient'];
    centralClient.postMessage(messageKey, messageValue, target);
  }

  iframePageLive(target, fn) {
    const centralClient = window['centralClient'];
    let evtObj = centralClient.on('$childFeedbackStatus', isLive => {
      fn.call(null, isLive);
      evtObj.cancel();
    });
    centralClient.postMessage('$pullChildStatus', null, target);
  }
}

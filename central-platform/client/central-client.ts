class CentralClient {
  private messageMap = new Map<string, Array<Function>>();
  constructor() {
    this._init();
  }

  _init() {
    window.addEventListener('message', evt => {
      let data = evt.data || {};
      if (data.messageKey) {
        let fnQueue = this.messageMap.get(data.messageKey) || [];
        fnQueue.forEach(fn => fn.call(null, data.messageValue, evt.source));
      }
    }, false);
  }

  /**
   * 发消息
   * @param [string] messageKey
   */
  postMessage(messageKey: string, messageValue: any, target = window) {
    let msgObj = {
      messageKey,
      messageValue
    };
    target.postMessage(msgObj, '*');
  }

  /**
   * 接收消息
   */
  on(messageKey: string, fn: Function) {
    if (!this.messageMap.has(messageKey)) {
      this.messageMap.set(messageKey, []);
    }
    this.messageMap.get(messageKey).push(fn);
    let self = this;
    return {
      cancel() {
        let idx = self.messageMap.get(messageKey).findIndex(x => x === fn);
        if (idx < 0) { return; }
        self.messageMap.get(messageKey).splice(idx, 1);
      }
    }
  }

  _notifyParent(messageKey: string, messageValue: any = null) {
    if (window.parent) {
      this.postMessage(messageKey, messageValue, window.parent);
    }
  }

  /**
   * 页面进度条状态变化
   */
  changeProgressShown(shown: boolean = false) {
    this._notifyParent('$changeProgressShown', shown);
  }

  /**
   * Loading状态变化
   */
  changeLoadingShown(shown: boolean = false) {
    this._notifyParent('$changeLoadingShown', shown);
  }

  /**
   * 高度变化
   */
  notityHeightChange(height: number) {
    this._notifyParent('$childHeightChange', height);
  }

  /**
   * 通知路由变化
   */
  notifyRouteChangeSuccess(currentRoute: any) {
    this._notifyParent('$childRouteChangeSuccess', currentRoute);
  }

  /**
   * 拉取授权信息
   */
  pullAuthInfo(fn: Function) {
    let evtObj = this.on('$pushAuthInfo', data => {
      fn(data);
      evtObj.cancel();
    });
    this._notifyParent('$childPullAuthInfo');
  }

  openNewTab(path) {
    // 没有在iframe中
    let url;
    if (parent === self) {
      url = path;
    } else { // iframe中，需要单独处理下
      let newkitHost = (window['NEG'] || {}).newkitHost || '';
      url = newkitHost + path;
    }
    this._linkToUrl(url);
  }

  _linkToUrl(url) {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    // 兼容IE9处理
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
    });
  }
}

window['centralClient'] = new CentralClient();

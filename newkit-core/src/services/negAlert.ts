import { Injectable } from '@angular/core';
import { NegUtil } from './negUtil';
import { NegTranslate } from './negTranslate';
import { NegMessageBox } from './negMessageBox';

let noop = function () { };

const defaults = {
  type: 'info',
  theme: 'flat',
  hideAfter: 3,
  showCloseButton: true,
  escapeText: true
};

const typesOpt = {
  warn: { color: '#C79121', icon: 'fa fa-shield fadeInLeft animated' },
  error: { color: '#C46A69', icon: 'fa fa-warning shake animated' },
  success: { color: '#739E73', icon: 'fa fa-check' },
  info: { color: '#3276B1', icon: 'fa fa-bell swing animated' },
};

declare let Messenger: any;

@Injectable()
export class NegAlert {

  private messageBox: any;

  constructor(
    private negUtil: NegUtil,
    private negTranslate: NegTranslate,
    private negMessageBox: NegMessageBox) {
    Messenger.options = {
      extraClasses: 'messenger-fixed messenger-on-top',
      theme: 'flat'
    };
    this.messageBox = Messenger();
  }

  info(message: string, callback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      let opt = Object.assign({}, userOpt, { type: 'info', callback, message });
      return this._post(opt);
    } else {
      return this.negMessageBox.info(message, null, callback, userOpt);
    }
  }

  success(message: string, callback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      let opt = Object.assign({}, userOpt, { type: 'success', callback, message });
      return this._post(opt);
    } else {
      return this.negMessageBox.success(message, null, callback, userOpt);
    }
  }

  warn(message: string, callback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      let opt = Object.assign({}, userOpt, { type: 'warn', callback, message });
      return this._post(opt);
    } else {
      return this.negMessageBox.warn(message, null, callback, userOpt);
    }
  }

  error(message: string, callback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      let opt = Object.assign({}, userOpt, { type: 'error', callback, message });
      return this._post(opt);
    } else {
      return this.negMessageBox.error(message, null, callback, userOpt);
    }
  }

  alert(message: string, callback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      let okText = this.negTranslate.get('core.negAlert.okText');
      let opt = Object.assign({}, userOpt, {
        message,
        type: 'error',
        showCloseButton: false,
        seconds: 60 * 60 * 24 * 15,
        actions: {
          [okText]: callback || noop
        }
      });
      return this._post(opt);
    } else {
      return this.negMessageBox.alert(message, null, callback, userOpt);
    }
  }

  confirm(message: string, okCallback?: Function, cancelCallback?: Function, userOpt = {}, useMessenger = false) {
    if (useMessenger) {
      var $backdrop = this._getBackdrop();
      let okText = this.negTranslate.get('core.negAlert.okText');
      let cancelText = this.negTranslate.get('core.negAlert.cancelText');
      let opt = Object.assign({}, userOpt, {
        message,
        type: 'info',
        showCloseButton: false,
        seconds: 60 * 60 * 24 * 15,
        actions: {
          [okText]: okCallback || noop,
          [cancelText]: cancelCallback || noop
        }
      });
      return this._post(opt, $backdrop);
    } else {
      return this.negMessageBox.confirm(message, null, okCallback, cancelCallback, userOpt);
    }
  }

  _getBackdrop() {
    let $ = window['jQuery'];
    let $backdrop = $('#alert-modal-backdrop');
    if ($backdrop.length === 0) {
      $backdrop = $('<div id="alert-modal-backdrop" class="modal-backdrop fade in" style="z-index: 10100;"><input id="input_messenger_placeholder_jay" style="margin-left:-1000px;"></div>').appendTo($('body'));
    }
    return $backdrop;
  }

  show(message: string, userOpt = {}) {
    let opt = Object.assign({ type: 'info' }, userOpt, { message });
    return this._post(opt);
  }

  _post(options: any, backdrop?) {
    let opt: any = Object.assign({}, defaults);
    ['type', 'theme', 'closeButtonText', 'onClickClose', 'message'].forEach(p => {
      opt[p] = options[p];
    });
    if (options.showCloseButton === false) {
      opt.showCloseButton = false;
    }
    if (options.allowHtml) {
      opt.escapeText = false;
    }
    if (options.seconds) {
      opt.hideAfter = options.seconds;
    }
    if (options.actions) {
      opt.actions = {};
      Object.keys(options.actions).forEach((label, idx) => {
        opt.actions[`btn${idx + 1}`] = {
          label,
          action(evt, msg) {
            Promise.resolve(options.actions[label](msg))
              .then(notCancel => {
                if (notCancel !== false) {
                  msg.hide();
                }
              });
          }
        };
      });
    }
    let ins = this.messageBox.post(opt);
    if (typeof options.callback === 'function') {
      this.negUtil.addWatcher(ins, 'shown', (newVal, oldVal) => {
        if (oldVal !== newVal && !newVal) {
          options.callback(ins);
        }
      }, ins.shown);
    }
    ins.on('hide', () => {
      backdrop && backdrop.remove();
    });
    return ins;
  }

  close(ins) {
    if (ins && typeof ins.hide === 'function') {
      ins.hide();
    }
    if (typeof ins === 'string') {
      this.negMessageBox.close(ins);
    }
  }

  closeAll() {
    this.messageBox.hideAll();
    this.negMessageBox.closeAll();
  }

  notify(content: string, callback?: Function, userOpt: {
    title?: string,
    type?: string,
    color?: string,
    icon?: string,
    timeout?: number
  } = {}) {
    let opt: any = Object.assign({}, userOpt, {
      content,
      callback
    });
    return this._notify(opt, userOpt);
  }

  _notify(opt, userOpt) {
    if (!userOpt.hasOwnProperty('title')) {
      opt.title = 'Notify';
    }
    let typeOpt = typesOpt[opt.type];
    if (typeOpt) {
      opt.color = typeOpt.color;
      opt.icon = typeOpt.icon;
    }
    $.bigBox(opt, opt.callback || noop);
  }
};

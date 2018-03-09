import { Injectable } from '@angular/core';
import { NegTranslate } from './negTranslate';

const typesOpt = {
  warn: { title: 'Warn' },
  error: { title: 'Error' },
  success: { title: 'Success' },
  info: { title: 'Information' },
};

@Injectable()
export class NegMessageBox {

  private _wrapper: any;
  private _instances: Map<string, MessageBox> = new Map<string, MessageBox>();

  constructor(
    private negTranslate: NegTranslate
  ) { }

  info(message: string, title?: string, callback?: Function, userOpt = {}) {
    userOpt = userOpt || {};
    let opt = Object.assign({}, userOpt, {
      mode: 'normal',
      type: 'info',
      title: title || typesOpt.info.title,
      autoClose: true,
      closeCb: callback,
      message
    });
    return this._showMessageBox(opt);
  }

  success(message: string, title?: string, callback?: Function, userOpt = {}) {
    userOpt = userOpt || {};
    let opt = Object.assign({}, userOpt, {
      mode: 'normal',
      type: 'success',
      title: title || typesOpt.success.title,
      autoClose: true,
      closeCb: callback,
      message
    });
    return this._showMessageBox(opt);
  }

  warn(message: string, title?: string, callback?: Function, userOpt = {}) {
    userOpt = userOpt || {};
    let opt = Object.assign({}, userOpt, {
      mode: 'normal',
      type: 'warn',
      title: title || typesOpt.warn.title,
      autoClose: true,
      closeCb: callback,
      message
    });
    return this._showMessageBox(opt);
  }

  error(message: string, title?: string, callback?: Function, userOpt = {}) {
    userOpt = userOpt || {};
    let opt = Object.assign({}, userOpt, {
      mode: 'normal',
      type: 'error',
      title: title || typesOpt.error.title,
      autoClose: true,
      closeCb: callback,
      message
    });
    return this._showMessageBox(opt);
  }

  alert(message: string, title?: string, callback?: Function, userOpt: any = {}) {
    userOpt = userOpt || {};
    let okText = this.negTranslate.get('core.negAlert.okText');
    let type = typesOpt[userOpt.type] ? userOpt.type : 'info';
    let opt = Object.assign({}, userOpt, {
      mode: 'alert',
      type: type,
      title: title || typesOpt[type].title,
      autoClose: false,
      showCloseBtn: false,
      okCallback: callback,
      okText: okText,
      message
    });
    return this._showMessageBox(opt);
  }

  confirm(message: string, title?: string, okCallback?: Function, cancelCallback?: Function, userOpt: any = {}) {
    let okText = this.negTranslate.get('core.negAlert.okText');
    let cancelText = this.negTranslate.get('core.negAlert.cancelText');
    let type = typesOpt[userOpt.type] ? userOpt.type : 'warning';
    let opt = Object.assign({}, userOpt, {
      mode: 'confirm',
      type: type,
      title: title || 'Confirm',
      autoClose: false,
      showCloseBtn: false,
      okCallback: okCallback,
      cancelCallback: cancelCallback,
      okText: okText,
      cancelText: cancelText,
      message
    });
    return this._showMessageBox(opt);
  }

  close(id: string) {
    if (typeof id !== 'string') return;
    let msgbox = this._instances.get(id);
    if (msgbox) msgbox.hide();
  }

  closeAll() {
    if (this._instances) {
      this._instances.forEach(value => {
        value.hide();
      });
    }
  }

  private _showMessageBox(opt: any) {
    this._checkWarpper();

    if (opt.seconds && !opt.timeout && Number.isInteger(opt.seconds)) {
      opt.timeout = opt.seconds * 1000;
    }

    let msgbox = new MessageBox(opt, this._onBoxClose.bind(this));
    if (this._wrapper.children.length === 0) {
      this._wrapper.appendChild(msgbox.domElement);
    } else {
      this._wrapper.insertBefore(msgbox.domElement, this._wrapper.children[0]);
    }
    this._instances.set(msgbox.id, msgbox);
    msgbox.show();

    return msgbox.id;
  }

  private _onBoxClose(id) {
    this._instances.delete(id);
  }

  private _checkWarpper() {
    this._wrapper = document.querySelector('.nk-message-box-warpper');
    if (!this._wrapper) {
      this._wrapper = document.createElement('div');
      this._wrapper.classList.add('nk-message-box-warpper');
      document.body.appendChild(this._wrapper);
    }
  }
}


class MessageBox {

  private opt: any;
  private timer: any;
  private closeCb: Function;
  private backdrop: any;

  public id: string;
  public domElement: any;

  constructor(opt: any, closeCb: Function) {
    this.opt = opt;
    this.opt.timeout = this.opt.timeout || 3000;
    this.closeCb = closeCb;
    this.id = `msg_box_${new Date().valueOf()}_${Math.floor(Math.random() * 10000)}`;
    this._buildElement();
  }

  show() {
    window['jQuery'](this.domElement).show();
    this._autoClose();
    if (this.opt.mode === 'confirm') {
      this.backdrop = this._getBackdrop();
    }
  }

  hide() {
    if (this.timer) clearTimeout(this.timer);
    window['jQuery'](this.domElement).slideUp('fast', () => {
      this.domElement.remove();
      if (this.backdrop) {
        let count = +this.backdrop.attr('data-count');
        if (count === 1) {
          this.backdrop.remove();
        } else {
          count--;
          this.backdrop.attr('data-count', count);
        }
      }

      if (this.closeCb) this.closeCb(this.id);
      if (this.opt.mode === 'normal' && this.opt.closeCb && typeof this.opt.closeCb === 'function') {
        this.opt.closeCb();
      }
    });
  }

  onCloseBtnClick(evt: any) {
    this.hide();
  }

  onMouseEnter(evt: any) {
    if (this.timer) clearTimeout(this.timer);
  }

  onMouseLeave(evt: any) {
    this._autoClose();
  }

  onOkBtnClick(evt: any) {
    this.hide();
    if (this.opt.mode !== 'normal' && this.opt.okCallback && typeof this.opt.okCallback === 'function') {
      this.opt.okCallback();
    }
  }

  onCancelBtnClick(evt: any) {
    this.hide();
    if (this.opt.mode === 'confirm' && this.opt.cancelCallback && typeof this.opt.cancelCallback === 'function') {
      this.opt.cancelCallback();
    }
  }

  private _autoClose() {
    if (!this.opt.autoClose) return;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hide();
    }, this.opt.timeout);
  }

  private _buildElement() {
    let boxItem = document.createElement('div');
    boxItem.id = this.id;
    boxItem.style.display = 'none';
    boxItem.classList.add(...['nk-message-box', this.opt.type]);

    let boxTitle = document.createElement('div');
    boxTitle.classList.add('box-title');
    boxTitle.innerHTML = `<div class="header">${this.opt.title}</div>`;
    if (this.opt.showCloseBtn !== false) {
      let closeBtn = document.createElement('div');
      closeBtn.classList.add('close-btn');
      closeBtn.innerHTML = '<i class="fa fa-remove"></i>';
      closeBtn.onclick = this.onCloseBtnClick.bind(this);
      boxTitle.appendChild(closeBtn);
    }
    boxItem.appendChild(boxTitle);

    let boxContent = document.createElement('div');
    boxContent.classList.add('box-content');
    if (this.opt.allowHtml) {
      boxContent.innerHTML = this.opt.message;
    } else {
      boxContent.innerText = this.opt.message;
    }
    boxItem.appendChild(boxContent);

    if (this.opt.mode === 'alert' || this.opt.mode === 'confirm') {
      let boxFooter = document.createElement('div');
      boxFooter.classList.add('box-footer');
      let okBtn = document.createElement('button');
      okBtn.classList.add('nk-button');
      okBtn.textContent = this.opt.okText;
      okBtn.onclick = this.onOkBtnClick.bind(this);
      boxFooter.appendChild(okBtn);

      if (this.opt.mode === 'confirm') {
        okBtn.classList.add('nk-button-primary');
        let cancelBtn = document.createElement('button');
        cancelBtn.classList.add('nk-button');
        cancelBtn.textContent = this.opt.cancelText;
        cancelBtn.onclick = this.onCancelBtnClick.bind(this);
        boxFooter.appendChild(cancelBtn);
      }

      boxItem.appendChild(boxFooter);
    }

    boxItem.onmouseenter = this.onMouseEnter.bind(this);
    boxItem.onmouseleave = this.onMouseLeave.bind(this);

    this.domElement = boxItem;
  }

  private _getBackdrop() {
    let $ = window['jQuery'];
    let $backdrop = $('#msg_box_backdrop');
    if ($backdrop.length === 0) {
      $backdrop = $('<div id="msg_box_backdrop" class="modal-backdrop fade in" style="z-index: 1000190;" data-count="1"></div>').appendTo($('body'));
    } else {
      let count = +$backdrop.attr('data-count');
      count++;
      $backdrop.attr('data-count', count);
    }
    return $backdrop;
  }
}
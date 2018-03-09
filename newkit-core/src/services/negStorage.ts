import { Injectable } from '@angular/core';

import { NegUtil } from './../services/negUtil';

let isPlainObject = (value) => !!value && Object.prototype.toString.call(value) === '[object Object]';

interface IStorage {
  set(name: string, value?: string | Object, options?: any);

  get(name: string);

  remove(name: string);

  clear();
}

class CookieStorage implements IStorage {
  private negUtil: NegUtil;

  constructor(negUtil: NegUtil) {
    this.negUtil = negUtil;
  }

  get(name: string): string {
    let nameEq = name + '=';
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEq) === 0) {
        return this.negUtil.unescape(c.substring(nameEq.length, c.length));
      }
    }
    return null;
  }

  set(name: string | {}, value?: string | {}, options?: any): void {
    if (isPlainObject(name)) {
      Object.keys(name).forEach(k => {
        this.set(k, name[k], value);
      });
      return;
    }
    let opt = isPlainObject(options) ? options : { expires: options };
    let expires = opt.expires !== undefined ? opt.expires : '';
    let expiresType = typeof (expires);
    let path = opt.path !== undefined ? ';path=' + opt.path : ';path=/';
    let domain = opt.domain ? ';domain=' + opt.domain : '';
    let secure = opt.secure ? ';secure=' + opt.secure : '';
    // 过期时间
    if (expiresType === 'string' && expires !== '') {
      expires = new Date(expires);
    } else if (expiresType === 'number') {
      expires = new Date(+new Date + 1000 * 60 * 60 * 24 * expires);
    }
    if (expires !== '' && 'toGMTString' in expires) {
      expires = ';expires=' + expires.toGMTString();
    }
    document.cookie = name + '=' + this.negUtil.escape(value as string) + expires + path + domain + secure;   // 转码并赋值    
  }

  remove(name: string) {
    this.set(name, '', -1);
  }

  clear() {
    let cookies = document.cookie.split(';');
    cookies.forEach(c => {
      let name = c.split('=')[0];
      this.remove(name);
    });
  }
}

class LocalStorage implements IStorage {
  constructor() {
    if (!window.localStorage) {
      console.warn('local storage not supported.');
    }
  }

  set(key: string, value: Object) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    let value = window.localStorage.getItem(key);
    return JSON.parse(value);
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.clear();
  }
}

class SessionStorage implements IStorage {
  constructor() {
    if (!window.sessionStorage) {
      console.warn('session storage not supported.');
    }
  }

  set(key: string, value: Object) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    let value = window.sessionStorage.getItem(key);
    return JSON.parse(value);
  }

  remove(key: string) {
    window.sessionStorage.removeItem(key);
  }

  clear() {
    window.sessionStorage.clear();
  }
}

let memoryMap: Map<string, any> = new Map<string, any>();
class MemoryStorage implements IStorage {
  constructor() {
    if (!window.sessionStorage) {
      console.warn('session storage not supported.');
    }
  }

  set(key: string, value: Object) {
    memoryMap.set(key, value);
  }

  get(key: string) {
    return memoryMap.get(key);
  }

  remove(key: string) {
    memoryMap.delete(key);
  }

  clear() {
    memoryMap.clear();
  }
}

@Injectable()
export class NegStorage {

  public cookie;
  public local;
  public session;
  public memory;

  constructor(private negUtil: NegUtil) {
    this.cookie = new CookieStorage(negUtil);
    this.local = new LocalStorage();
    this.session = new SessionStorage();
    this.memory = new MemoryStorage();
  }
}

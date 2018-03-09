import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class NegUtil {

  private window: any;

  public saveAs: Function;

  public encodeBase64: Function;

  constructor(private activatedRoute: ActivatedRoute) {
    this.window = window;
  }

  encodeUri(text: string): string {
    return this.window.encodeURI(text);
  }

  decodeUri(text: string): string {
    return this.window.decodeURI(text);
  }

  escape(text: string): string {
    return this.window.escape(text);
  }

  unescape(text: string): string {
    return this.window.unescape(text);
  }
  /**
   * Get query string.
   * @param  {string} key? If key exists, return this key value; else, return all query object.
   */
  getQuery(key?: string): any {
    let search = window.location.search.substring(1);
    const searchObj = {};
    search.split('&').forEach(s => {
      let sArr = s.split('=');
      searchObj[sArr[0]] = sArr[1];
    });
    if (key) {
      return searchObj[key];
    }
    return searchObj;
  }

  /**
   * Get base url by window.location
   * @param  {any} location
   */
  getBaseUrl(location) {
    return `${location.protocol}//${location.host}`;
  }

  /**
   * Add watcher to object property changed.
   * @param  {{}} obj The object that add watcher.
   * @param  {string} property The property that watched.
   * @param  {Function} watherFn Property changed callback.
   * @param  {} defaultVal The default value for property.
   */
  addWatcher(obj: {}, property: string, watherFn: Function, defaultVal) {
    let privateProperty = `__${property}`;
    obj[privateProperty] = defaultVal;
    Object.defineProperty(obj, property, {
      get() {
        return this[privateProperty];
      },
      set(val) {
        let oldVal = this[property];
        this[privateProperty] = val;
        watherFn(val, oldVal);
      }
    });
  }

  /**
   * Remove item from Array(=== judge)
   * @param  {Array<any>} arr
   * @param  {any} item
   */
  remove(arr: Array<any>, item: any) {
    let idx;
    if (typeof item === 'function') {
      idx = arr.findIndex(item);
    } else {
      idx = arr.indexOf(item);
    }
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
  }

  /**
   * Generate UUID
   */
  generateUUID() {
    return this.window.uuid.v4();
  }

  /**
   * Get current module name
   */
  getModuleName(): string {
    let moduleName = 'nk-core';
    let pathName = window.location.pathname;
    let pathArr = pathName.split('/');
    if (pathArr.length > 1) {
      moduleName = pathArr[1];
      if (moduleName === 'system') {
        moduleName = 'nk-shell';
      }
    }
    return moduleName;
  }

  resetObject(obj: object) {
    Object.keys(obj).forEach(k => {
      let v = obj[k];
      let vType = typeof v;
      if (Array.isArray(v)) {
        obj[k] = [];
      } else if (vType === 'number') {
        obj[k] = 0;
      } else if (vType === 'string') {
        obj[k] = '';
      } else if (vType === 'boolean') {
        obj[k] = false;
      }
    });
  }

  downloadFile(fileUrl: string, fileName?: string) {
    let a = document.createElement('a');
    a.setAttribute('href', fileUrl);
    a.setAttribute('target', '_blank');
    a.style.display = 'none';
    if (fileName) {
      a.setAttribute('download', fileName);
    }
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /**
   * Get current route params
   */
  getRouteParams(): any {
    return this._getCurrentRouteParams('params');
  }

  /**
   * Get current route queryParams
   */
  getRouteQueryParams(): any {
    return this._getCurrentRouteParams('queryParams');
  }

  /**
   * Get current route data
   */
  getRouteData(): any {
    return this._getCurrentRouteParams('data');
  }

  /**
   * Get current route fragment
   */
  getRouteFragments(): any {
    return this._getCurrentRouteParams('fragment');
  }

  private _getCurrentRouteParams(type) {
    let params = _.cloneDeep(this.activatedRoute.snapshot[type]);
    let parentRoute = this.activatedRoute.parent;
    while (parentRoute) {
      let tempParams = _.cloneDeep(parentRoute.snapshot[type]);
      params = _.merge(tempParams, params);
      parentRoute = parentRoute.parent;
    }

    let childRoute = this.activatedRoute.children[0];
    while (childRoute) {
      let tempParams = _.cloneDeep(childRoute.snapshot[type]);
      params = _.merge(params, tempParams);
      childRoute = childRoute.children[0];
    }
    return params;
  }
}

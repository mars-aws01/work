declare let NewkitConf;
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

const moduleDepsMapping: Map<string, string[]> = new Map<string, string[]>();

let instance = null;

@Injectable()
export class NegModuleLoader {

  public static load(moduleName) {
    return instance.load(moduleName);
  }

  public static defineModule(name: string, deps: string[], callback: Function) {
    let p: Promise<any> = Promise.resolve();
    moduleDepsMapping.set(name, deps || []);
    if (deps && deps.length > 0) {
      let depArr = deps.map(dep => instance.load(dep, true));
      p = Promise.all(depArr);
    }
    return p.then(() => {
      const mod = callback();
      return mod;
    });
  };

  constructor(private http: Http) {
    instance = this;
  }

  load(moduleName, isDepModule = false): Promise<any> {
    let module = window['newkit'][moduleName];
    if (module) {
      return Promise.resolve(module.AppModule);
    }
    return new Promise((resolve, reject) => {
      let path = `${NewkitConf.moduleRoot}${moduleName}/app.js?rnd=${Math.random()}`;
      this._loadCss(moduleName);
      this.http.get(path)
        .toPromise()
        .then(res => {
          let code = res.text();
          this._DomEval(code);
          return window['newkit'][moduleName];
        })
        .then(mod => {
          window['newkit'][moduleName] = mod;
          let AppModule = mod.AppModule;
          // route change will call useModuleStyles function.
          // this.useModuleStyles(moduleName, isDepModule);
          resolve(AppModule);
        })
        .catch(err => reject(err));
    });
  }

  useModuleStyles(moduleName: string): void {
    let newkitModuleStyles = [].slice.apply(document.querySelectorAll('.newkit-module-style'));
    let moduleDeps = this._getModuleAndDeps(moduleName);
    newkitModuleStyles.forEach(link => {
      let disabled = true;
      for (let i = moduleDeps.length - 1; i >= 0; i--) {
        if (link.className.indexOf(moduleDeps[i]) >= 0) {
          disabled = false;
          moduleDeps.splice(i, 1);
          break;
        }
      }
      link.disabled = disabled;
    });
  }

  _getModuleAndDeps(moduleName: string): Array<any> {
    if (moduleName === 'system') {
      return [];
    }
    if (!moduleDepsMapping.has(moduleName)) {
      return [];
    }
    let result = [moduleName];
    let deps = moduleDepsMapping.get(moduleName);
    deps.forEach(dep => {
      result.push(...this._getModuleAndDeps(dep));
    });
    return result;
  }

  _loadCss(moduleName: string): void {
    let cssPath = `${NewkitConf.moduleRoot}${moduleName}/app.css?rnd=${Math.random()}`;
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', cssPath);
    link.setAttribute('class', `newkit-module-style ${moduleName}`);
    document.querySelector('head').appendChild(link);
  }

  _DomEval(code, doc?) {
    doc = doc || document;
    let script = doc.createElement('script');
    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
}

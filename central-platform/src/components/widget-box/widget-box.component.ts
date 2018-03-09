import {
  AfterViewInit,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  ModuleWithComponentFactories,
  NgModuleFactoryLoader,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { NegAjax } from '@newkit/core';

require('./widget-box.component.styl');

@Component({
  selector: 'widget-box',
  templateUrl: 'widget-box.component.html'
})

export class WidgetBoxComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  public widgetName: string;

  @ViewChild("widgetBox", { read: ViewContainerRef })
  public widgetBox: ViewContainerRef;

  private cmpRef: ComponentRef<Component>;

  constructor(
    private compiler: Compiler,
    private resolver: ComponentFactoryResolver,
    private negAjax: NegAjax
  ) {
  }

  static widgetMap = new Map<string, string>(); // pending, completed, failed = [];

  ngOnInit() {
  }

  ngOnChanges(changesObj) {
    if (changesObj.widgetId) {
      this._loadWidget();
    }
  }

  ngAfterViewInit() {
    this._loadWidget();
  }

  private _load(moduleName, isDepModule = false): Promise<any> {
    let p = Promise.resolve();
    let widgetStatus = WidgetBoxComponent.widgetMap.get(this.widgetName);
    if (widgetStatus === 'pending') {
      p = new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
          widgetStatus = WidgetBoxComponent.widgetMap.get(this.widgetName);
          if (widgetStatus !== 'pending') {
            clearInterval(intervalId);
            resolve();
          }
        }, 200);
      });
    }
    WidgetBoxComponent.widgetMap.set(moduleName, 'pending');
    return p.then(() => {
      let module = window['newkit'][moduleName];
      if (module) {
        return Promise.resolve(module.AppModule);
      } else {

        return new Promise((resolve, reject) => {
          let path = `${NewkitConf.widgetRoot}${moduleName}/app.js`;
          this.negAjax.get(path)
            .then(({ res }) => {
              WidgetBoxComponent.widgetMap.set(moduleName, 'completed');
              let code = res.text();
              this._DomEval(code);
              return window['newkit'][moduleName];
            })
            .then(mod => {
              window['newkit'][moduleName] = mod;
              let AppModule = mod.AppModule;
              resolve(AppModule);
            })
            .catch(err => {
              WidgetBoxComponent.widgetMap.set(moduleName, 'failed');
              reject(err);
            });
        });
      }
    });
  }

  private _DomEval(code, doc?) {
    doc = doc || document;
    let script = doc.createElement('script');
    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  private _loadWidget() {
    if (!this.widgetName) {
      return;
    }
    return this._load(this.widgetName)
      .then(mod => {
        return this.compiler.compileModuleAndAllComponentsAsync(mod);
      })
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        const factory = moduleWithFactories.componentFactories.find(x => x.selector === 'newkit-widget-component' && x.componentType.name === 'WidgetComponent');
        this.widgetBox.clear();
        let componentRef = this.widgetBox.createComponent(factory, 0);
      });

  }
}
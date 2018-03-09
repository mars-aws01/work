import { Router, ChildrenOutletContexts, PRIMARY_OUTLET } from '@angular/router';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ReflectiveInjector,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NegGlobalLoading } from '@newkit/core';

import { MultiTabComponent } from './multi-tab.component';
import { HomeComponent } from './../../pages/home/home.component';

@Component({
  selector: 'nk-multi-tab-item',
  templateUrl: 'multi-tab-item.component.html'
})
export class MultiTabItemComponent implements OnInit, OnChanges {

  public innerName: string;
  private _active = false;
  public get active() { return this._active; }
  public set active(val) {
    this._active = val;
    if (val) {
      if (this._domCache) {
        this.elementRef.nativeElement.appendChild(this._domCache);
      }
      this._fireOnTabActive();
      this.renderer.addClass(this.elementRef.nativeElement, 'active');
    } else {
      this._domCache = this.elementRef.nativeElement.children[0];
      this.elementRef.nativeElement.removeChild(this._domCache);
      this.renderer.removeClass(this.elementRef.nativeElement, 'active');
    }
  }

  private timerId: any;
  private dynamicComponent: any;
  private _domCache: any;

  @Input() name: string;
  @Input() header: string;
  @Input() icon: string;
  @Input() comp: any;
  @Input() closable = false;
  @Input() fullUrl: string;
  @Input() index: number;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tabset: MultiTabComponent,
    private resolver: ComponentFactoryResolver,
    private parentContexts: ChildrenOutletContexts,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _negGlobalLoading: NegGlobalLoading) {

  }

  ngOnInit() {
    this.tabset.tabItems[this.index] = this;
    this.elementRef.nativeElement.className = 'nk-tab-item tab-pane';
  }

  ngOnDestroy() {
    this.destroy()
      .then(_ => { })
      .catch(err => { console.log('Destroy tab failed', err) });
    this._domCache = null;
    this.dynamicComponent = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.innerName = this.name;
    }
    if (changes.comp) {
      // 动态加载组件
      setTimeout(() => {
        this.loadComponent(this.comp);
      });
    }
  }

  private _fireOnTabActive() {
    if (this.dynamicComponent) {
      let instance = this.dynamicComponent.instance;
      if (instance && instance.onTabActive && typeof instance.onTabActive === 'function') {
        setTimeout(() => {
          instance.onTabActive();
        });
      }
    }
  }

  public refresh() {
    if (this.dynamicComponent) {
      this.dynamicComponent.destroy();
    }
    setTimeout(() => {
      this.loadComponent(this.comp);
    });
  }

  canDeactive() {
    return new Promise((resolve, reject) => {
      let canDeactive = true;
      if (this.dynamicComponent) {
        let instance = this.dynamicComponent.instance;
        if (instance && instance.onTabDeactive && typeof instance.onTabDeactive === 'function') {
          canDeactive = instance.onTabDeactive();
        }
      }
      resolve(canDeactive);
    });
  }

  public destroy() {
    return new Promise((resolve, reject) => {
      let canDestroyPromise;
      if (this.dynamicComponent) {
        let instance = this.dynamicComponent.instance;
        if (instance && instance.onTabDestroy && typeof instance.onTabDestroy === 'function') {
          canDestroyPromise = instance.onTabDestroy();
        }
      }

      Promise.resolve(canDestroyPromise === undefined ? true : canDestroyPromise)
        .then(data => {
          let canDestroy = !!data;
          if (canDestroy) {
            if (this.dynamicComponent) {
              this.dynamicComponent.changeDetectorRef.detach();
              this.dynamicComponent.changeDetectorRef.detachFromAppRef();
              if (!this.dynamicComponent.changeDetectorRef['destroyed']) {
                this.dynamicComponent.changeDetectorRef.detectChanges();
              }
              this.dynamicComponent.destroy();

              if (this.dynamicComponentContainer) {
                this.dynamicComponentContainer.clear()
                this.dynamicComponentContainer.detach();
              }
            }
            let el = this.elementRef.nativeElement as HTMLElement;
            el.parentNode && (el.parentNode.removeChild(el));
          }
          setTimeout(() => {
            resolve(canDestroy);
          }, 100);
        });
    });
  }

  private loadComponent(component: any) {
    this._negGlobalLoading.show();
    this.dynamicComponent = null;
    setTimeout(() => {
      try {
        let context = this.parentContexts.getContext(PRIMARY_OUTLET);
        let injector = ReflectiveInjector.fromResolvedProviders([], this.dynamicComponentContainer.injector);
        const resolver = context.resolver || this.resolver;
        let factory = resolver.resolveComponentFactory(component);
        this.dynamicComponent = this.dynamicComponentContainer.createComponent(factory);
        if (this.active) {
          setTimeout(() => { this._fireOnTabActive(); });
        }
      } catch (e) {
        console.log(e);
      }
      this._negGlobalLoading.hide();
    }, 500);
  }
}

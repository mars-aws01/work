import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ModuleLoaderService } from './module-loader.service';
import { NegEventBus } from '@newkit/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  private safeUrls: string[] = [
    '/',
    '/system/401',
    '/system/404',
    '/login',
    '/logout',
    '/system/newkitjs'
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private moduleLoaderService: ModuleLoaderService,
    private negEventBus: NegEventBus
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        NProgress.start();
      } else if (evt instanceof NavigationEnd || evt instanceof NavigationError || evt instanceof NavigationCancel) {
        let ga = window['ga'];
        ga && ga('send', 'pageview', this.router.url);
        NProgress.done();
        this.negEventBus.emit('$routeChangeEnd');
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // 仅需要校验是否已经登录
    return this.authService.requireAuth(state, route, this.router);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let canVisit = this.safeUrls.includes(state.url);
    // 如果，不是安全链接
    if (!canVisit) {
      let nextPath = '/' + (route as any)._urlSegment.segments.reduce((arr, item) => { arr.push(item.path); return arr }, []).join('/');
      canVisit = this.authService.canVisitUrl(nextPath);
    }
    if (!canVisit) {
      this.router.navigate(['/system/401']);
    } else {
      // 切换模块CSS样式
      let moduleName = state.url.split('/')[1];
      if (moduleName) {
        this.moduleLoaderService.useModuleStyles(moduleName);
      }
    }
    return Promise.resolve(canVisit);
  }

  canDeactivate(): boolean {
    return true;
  }

  canLoad(): boolean {
    return true;
  }
}

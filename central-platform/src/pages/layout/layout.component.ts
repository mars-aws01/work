import './layout.component.styl';

import { ActivatedRoute, NavigationEnd, NavigationStart, Router, NavigationCancel } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Renderer2, ElementRef, HostListener, isDevMode } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from './../../services';
import { NegAjax, NegAlert, NegAuth, NegEventBus, NegFeedback, NegGlobalLoading, NegStorage, NegTranslate, NegUserProfile, NegUtil, NegBizLog } from '@newkit/core';
import { AuthService, GlobalSearchService } from './../../services';

import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../404/notfound.component';
import { NewkitJsComponent } from '../newkitjs/newkitjs.component';

interface PageEntity {
  menuInfo: any;
  comp: any;
  path: string;
  fullUrl: string,
  closable?: boolean;
}

@Component({
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  @ViewChild('multiTabCtrl') multiTabCtrl: any;
  @ViewChild('tabToolsPanel') tabToolsPanel: ElementRef;
  @ViewChild('warpperView') warpperView: ElementRef;

  menuData: Array<any>;
  menuMap: Map<string, any>;
  breadcrumbs: Array<any> = [];
  lastBreadcrumbsCache: any = {};
  allBreadcrumbsCache: any = {};
  isLockedScreen: boolean = false;
  lockPass: string;
  isValidatingPass: boolean = false;

  public get isPageStared(): boolean {
    return this.staredUrls.indexOf(this.router.url) >= 0;
  }

  public subs = [];
  public userInfo: any = {}; // 用户信息
  public version: string = NewkitConf.version;
  public isFullScreen: boolean = false;

  public staredUrls: Array<any> = [];
  public globalSearchText: string = '';
  public showPageFooter: boolean = false;

  public pageList: PageEntity[] = [];
  private recentClosedPages: PageEntity[] = [];
  public selectedPage = 'page1';

  feedbackModalShown: boolean;
  showMenu: boolean;

  globalSearchSettings: Array<any> = [];
  selectedGlobalSearchUrl: string;
  selectedGlobalSearchItem: any;

  constructor(
    private selfElement: ElementRef,
    private sanitizer: DomSanitizer,
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private renderer: Renderer2,
    public negEventBus: NegEventBus,
    public negGlobalLoading: NegGlobalLoading,
    public negStorage: NegStorage,
    public negAuth: NegAuth,
    public negAjax: NegAjax,
    public negAlert: NegAlert,
    public negTranslate: NegTranslate,
    private negFeedback: NegFeedback,
    private negUtil: NegUtil,
    private negBizLog: NegBizLog,
    public negUserProfile: NegUserProfile,
    public menuService: MenuService,
    private authService: AuthService,
    private globalSearchService: GlobalSearchService) {

  }

  public toggleMenuStatus() {
    this.showMenu = !this.showMenu;
  }

  public doGlobalSearch() {
    if (this.globalSearchText) {
      let url = this.selectedGlobalSearchUrl.replace('{0}', this.globalSearchText);
      this.router.navigateByUrl(url);
      this.globalSearchText = '';
    }
  }

  //#region tabs-handler
  setTabPage(page: any) {
    this.router.navigateByUrl(page.fullUrl || page);
  }

  goToTab(page) {
    this.router.navigateByUrl(page.fullUrl || page);
  }

  optionsMouseEnter(event: any, element: any) {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.setStyle(element, 'display', '');
    this.renderer.setStyle(element, 'height', '');
  }

  tabDropdownPanelClick(event, tabDropdownPanel) {
    event.stopPropagation();
    event.preventDefault();
    tabDropdownPanel.parentElement.focus();
    this.renderer.setStyle(tabDropdownPanel, 'display', 'none');
    this.renderer.setStyle(tabDropdownPanel, 'height', '0');
  }

  refreshTab() {
    let index = _.findIndex(this.pageList, p => p.path === this.selectedPage);
    if (index === -1) return;
    this.multiTabCtrl.refresh(index);
  }

  toggleQuickLink() {
    let page = _.find(this.pageList, p => p.path === this.selectedPage);
    if (!page) return;

    let staredUrls = _.cloneDeep(this.staredUrls);
    let url = page.menuInfo.Url || page.path;
    let idx;
    if ((idx = staredUrls.indexOf(url)) >= 0) {
      staredUrls.splice(idx, 1);
    } else {
      staredUrls.push(url);
    }
    this.negUserProfile.set('staredUrls', staredUrls)
      .then(_ => {
        this.staredUrls = staredUrls;
        this.negEventBus.emit('quick-links-changed', staredUrls);
      })
      .catch(err => {
        this.negAlert.error('Add to quick links failed. Please try again.');
      });
  }

  closeTab(hasIndex: boolean, index?: number, evt?: any) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    if (!hasIndex) {
      index = _.findIndex(this.pageList, p => p.path === this.selectedPage);
    }
    if (index === -1) return;
    this._addToRecentPage(this.pageList[index]);
    this.multiTabCtrl.removeTab(index);
  }

  closeOtherTabs() {
    let index = -1;
    for (let i = 0; i < this.pageList.length; i++) {
      if (this.pageList[i].path !== this.selectedPage) {
        this._addToRecentPage(this.pageList[i]);
      } else {
        index = i;
      }
    }
    if (index === -1) return;
    this.multiTabCtrl.closeOtherTabs(index);
  }

  closeAllTabs() {
    this.pageList.forEach(p => this._addToRecentPage(p));
    this.multiTabCtrl.closeAllTabs();
  }

  actLeftTab() {
    let index = _.findIndex(this.pageList, p => p.path === this.selectedPage);
    if (index === -1 || index === 0) return;
    this.router.navigateByUrl(this.pageList[--index].path);
  }

  actRightTab() {
    let index = _.findIndex(this.pageList, p => p.path === this.selectedPage);
    if (index === -1 || index === this.pageList.length - 1) return;
    this.router.navigateByUrl(this.pageList[++index].path);
  }

  _addToRecentPage(page) {
    let url = page.path;
    if (url !== '/' && _.findIndex(this.recentClosedPages, p => p.path === url) === -1) {
      if (this.recentClosedPages.length > 10) this.recentClosedPages.shift();
      let tempPage = _.cloneDeep(page);
      tempPage.comp = null;
      this.recentClosedPages.push(tempPage);
    }
  }

  //#endregion

  private _initStatus() {
    this.negUserProfile.get('baseSettings')
      .then(profile => {
        profile = profile || {};
        this.negTranslate.use(profile.language || NewkitConf.defaultLang || 'en-us');
      });
    this.userInfo = this.negAuth.user;
    this.menuData = this.menuService.getMenuData();

    this.menuMap = new Map<string, any>();
    let menuArr = this._flatMenuData(this.menuData);
    this.menuMap.set('/', { MenuName: 'Home' });
    this.menuMap.set('/system/404', { MenuName: 'Page Not Found' });
    this.menuMap.set('/system/401', { MenuName: 'Access Denied' });
    menuArr.forEach(x => {
      let url = x.ModuleType === 'newkitjs' ? `/system/newkitjs#${x.Url}` : x.Url;
      this.menuMap.set(url, x);
    });

    this.negUserProfile.get('staredUrls')
      .then(data => {
        this.staredUrls = data || [];
      });


    this.globalSearchService.getGlobalSearchSettings()
      .then(data => { })
      .catch(err => { });
  }

  private _flatMenuData(menu: Array<any>, parent?: any) {
    menu = _.orderBy(menu, ['Sort'], ['desc']);
    let menuArr = [];
    for (let item of menu) {
      if (item.Url && item.subMenus.length == 0) {
        menuArr.push({
          Url: item.Url,
          MenuName: item.MenuName,
          MenuNameCn: item.MenuNameCn,
          MenuNameTw: item.MenuNameTw,
          ModuleType: item.ModuleType,
          parent: parent
        });
      }
      let parentMenu = {
        MenuName: item.MenuName,
        MenuNameCn: item.MenuNameCn,
        MenuNameTw: item.MenuNameTw,
        parent: parent
      }
      let tempArray = this._flatMenuData(item.subMenus, parentMenu);
      menuArr = menuArr.concat(tempArray);
    }
    return menuArr;
  }

  private _initMenuStyle(profile) {
    let $body = $('body');
    this.showPageFooter = profile.showPageFooter;
    profile.menuOnTop && $body.addClass('menu-on-top');
    profile.fixedPageFooter && $body.addClass('fixed-page-footer');
    $body.removeClass('fixed-header fixed-navigation fixed-ribbon');
    if (profile.fixedHeader !== false && profile.fixedNavigation !== false) {
      $body.addClass('fixed-header fixed-navigation fixed-ribbon');
    } else if (profile.fixedHeader !== false) {
      $body.addClass('fixed-header');
    }
  }

  private _functionPanelHeight: number;
  private _checkFuncPanelHeight() {
    let funcPanel: any = document.querySelector('nk-multi-tab-item.active nk-function-panel>div.nk-bottom-navbar');
    let funcPanelHeight = funcPanel ? funcPanel.offsetHeight : -10;
    if (!this.warpperView || this._functionPanelHeight === funcPanelHeight) return;
    this.renderer.setStyle(this.warpperView.nativeElement, 'paddingBottom', funcPanelHeight + 10 + 'px');
    this._functionPanelHeight == funcPanelHeight;
  }

  private _initSubscriber() {
    let lastBreadcrumbSub = this.negEventBus.on('global.setLastBreadcrumb', data => {
      if (!data) return;
      setTimeout(() => {
        this.lastBreadcrumbsCache[this.selectedPage] = data;
        this.breadcrumbs[this.breadcrumbs.length - 1] = data;
      });
    });
    this.subs.push(lastBreadcrumbSub);

    let breadcrumbSub = this.negEventBus.on('global.setBreadcrumbs', data => {
      if (!data || !data.force || !data.breadcrumbs || data.breadcrumbs.length === 0) return;
      setTimeout(() => {
        this.allBreadcrumbsCache[this.selectedPage] = data.breadcrumbs;
        this.breadcrumbs = data.breadcrumbs;
      });
    });
    this.subs.push(breadcrumbSub);

    let setTabNameSub = this.negEventBus.on('global.setTabName', data => {
      if (!data) return;
      setTimeout(() => {
        let index = _.findIndex(this.pageList, x => x.path === this.selectedPage);
        if (index !== -1) {
          this.pageList[index].menuInfo = data;
        }
      });
    });
    this.subs.push(setTabNameSub);

    let tabNavSubscriber = this.negEventBus.on('global.tabNavigation', data => {
      let isNewTab = !!data.newTab;
      if (!data.href) return;
      if (!data.queryParams && isNewTab) {
        this.router.navigateByUrl(data.href);
      } else {
        data.queryParams = data.queryParams || {};
        if (!isNewTab) {
          data.queryParams['__newTab__'] = isNewTab;
        }
        this.router.navigate([data.href], { queryParams: data.queryParams });
      }
    });
    this.subs.push(tabNavSubscriber);

    let toggleMenuSub = this.negEventBus.on('global.toggleMenuStatus', data => {
      this.toggleMenuStatus();
    });
    this.subs.push(toggleMenuSub);

    let feedbackSub = this.negEventBus.on('global.showFeedback', data => {
      this.showFeedback();
    });
    this.subs.push(feedbackSub);

    let globalSearchSub = this.globalSearchService.GlobalSearchSub.subscribe(data => {
      this.globalSearchSettings = data;
      if (data && data.length > 0) {
        let currentItem = _.find(data, x => x.UrlTemplate === this.selectedGlobalSearchUrl);
        if (!this.selectedGlobalSearchUrl || !currentItem) {
          this.globalSearchChanged(data[0].UrlTemplate);
        } else {
          this.globalSearchChanged(currentItem.UrlTemplate);
        }
      }
    });
    this.subs.push(globalSearchSub);
  }

  ngOnInit() {
    this._initStatus();
    this._initSubscriber();

    setInterval(() => {
      this._checkFuncPanelHeight();
    }, 1000);

    this.routerChange();
    let routeChangeSub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.negGlobalLoading.show();
      } else {
        this.negGlobalLoading.hide();
      }
      if (evt instanceof NavigationEnd) {
        this.routerChange();
      }
    });
    this.subs.push(routeChangeSub);
  }

  ngAfterViewInit() {
    let tempLocked = this.negStorage.cookie.get('LockedScreen');
    if (tempLocked === 'true') {
      this.lockScreen();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  @HostListener('body:keypress', ['$event'])
  private _bodyKeypress(evt: any) {
    if (evt.shiftKey && evt.code === 'KeyL') {
      evt.stopPropagation();
      evt.preventDefault();
      if (!this.isLockedScreen) {
        this.lockScreen();
      }
    }
  }

  globalSearchChanged(url: string) {
    this.selectedGlobalSearchUrl = url;
    this.selectedGlobalSearchItem = _.find(this.globalSearchSettings, x => x.UrlTemplate === url);
  }

  lockScreen() {
    this.isLockedScreen = true;
    this.selfElement.nativeElement.removeChild(this.warpperView.nativeElement);
    this.renderer.addClass(document.body, 'locked-screen');
    this.negStorage.cookie.set('LockedScreen', true);
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }

  unLock() {
    this.lockPass = null;
    this.isLockedScreen = false;
    this.selfElement.nativeElement.appendChild(this.warpperView.nativeElement);
    this.renderer.removeClass(document.body, 'locked-screen');
    this.negStorage.cookie.remove('LockedScreen');
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }

  login(form: any) {
    let password = form.value.LockPass;
    if (!password) {
      this.negAlert.error('Please enter the password');
      return;
    }
    if (password.length > 50) {
      this.negAlert.error('Password cannot be longer than 50 characters');
      return;
    }
    this.isValidatingPass = true;
    this.authService.checkDomainPass(this.negAuth.authData.userInfo.UserID, password)
      .then(res => {
        let data = res.data;
        if (!data.Result) {
          let msg = 'Invalid password. Please try again.';
          if (data.AccountStatus.AccountDisabled) {
            msg += ` [ Account is disabled ]`;
          } else if (data.AccountStatus.IsAccountLocked) {
            msg += ` [ Account is locked ]`;
          } else if (data.AccountStatus.IsPasswordExpired) {
            msg += ` [ Account password has expired ]`;
          }
          this.negAlert.error(msg, null, { timeout: 5000 });
        } else {
          this.unLock();
        }
        this.isValidatingPass = false;
      })
      .catch(err => {
        console.log(`[Unknown Error] ${err}`);
        this.isValidatingPass = false;
      })
  }

  onBeforeUnload($event) {
    let confirmationMessage = 'This will lose some data that you are not saved. Are you sure?';
    ($event || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }

  public showFeedback() {
    this.feedbackModalShown = true;
  }

  private routerChange() {
    let newTab: boolean = true;
    let pageComponent;
    let pagePath = location.pathname + location.hash;
    let menuInfo = this.menuMap.get(pagePath);
    if (!menuInfo) {
      let tempPath = pagePath.split(';')[0];
      let tempMenuInfo = this.menuMap.get(tempPath);
      if (tempMenuInfo) {
        pagePath = tempPath;
      }
      menuInfo = tempMenuInfo || { MenuName: '' };
    }

    try {
      if (!menuInfo.MenuName) {
        menuInfo.MenuName = 'Unknown Page';
      }

      let params = _.cloneDeep(this.route.snapshot.queryParams);
      let childRoute = this.route.children[0];
      pageComponent = this.route.component;
      while (childRoute) {
        pageComponent = childRoute.component || pageComponent;
        params = _.merge(params, _.cloneDeep(childRoute.snapshot.queryParams));
        childRoute = childRoute.children[0];
      }

      if (params['__newTab__'] !== undefined) {
        newTab = params['__newTab__'] === "false" ? false : true;
        let queryParams = [];
        for (let key in params) {
          if (key === '__newTab__') continue;
          queryParams.push(`${key}=${params[key]}`);
        }
        this.location.replaceState(pagePath, queryParams.join('&'));
      }
    } catch (e) {
      menuInfo.MenuName = menuInfo.MenuName || 'Module Not Found';
      pageComponent = NotFoundComponent;
    }

    let fullUrl = this.location.path(true) || '/';
    let currentPage = _.find(this.pageList, x => x.path === this.selectedPage);
    if (currentPage && currentPage.comp === pageComponent && currentPage.fullUrl === fullUrl) {
      return;
    };

    let targetPage = this.pageList.find(x => x.path === pagePath);
    if (!targetPage) {
      let tempPage = {
        menuInfo: menuInfo,
        comp: pageComponent,
        path: pagePath,
        fullUrl: fullUrl,
        closable: true
      };
      if (newTab) {
        this.pageList.push(tempPage);
      } else {
        let pageIndex = _.findIndex(this.pageList, x => x.path === this.selectedPage);
        this.pageList[pageIndex] = tempPage;
      }
    } else {
      if (targetPage.fullUrl !== fullUrl) {
        targetPage.fullUrl = fullUrl
      }
    }

    setTimeout(() => {
      this.multiTabCtrl.setActiveWithName(pagePath);
      if (!isDevMode()) {
        this.negBizLog.tracePageView();
      }
    });
  }

  pageListChanged(value: any) {
    this.pageList = value;
    let paths = value.map(x => x.path);
    let tempLastBreadcrumbs = {};
    let tempAllBreadcrumbs = {};
    value.forEach(x => {
      if (this.lastBreadcrumbsCache[x.path]) {
        tempLastBreadcrumbs[x.path] = this.lastBreadcrumbsCache[x.path];
      }
      if (this.allBreadcrumbsCache[x.path]) {
        tempAllBreadcrumbs[x.path] = this.allBreadcrumbsCache[x.path];
      }
    })
    this.lastBreadcrumbsCache = tempLastBreadcrumbs;
    this.allBreadcrumbsCache = tempAllBreadcrumbs;
  }

  onSelectedPageChange(pagePath: any) {
    this.selectedPage = pagePath;
    let tempPage = _.find(this.pageList, x => x.path === pagePath);
    this.breadcrumbs = [];
    if (tempPage) {
      let tempMenu = _.cloneDeep(tempPage.menuInfo);
      while (tempMenu) {
        this.breadcrumbs.unshift(tempMenu);
        tempMenu = tempMenu.parent;
      }
    }
    if (this.lastBreadcrumbsCache[pagePath]) {
      this.breadcrumbs[this.breadcrumbs.length - 1] = this.lastBreadcrumbsCache[pagePath];
    }
    if (this.allBreadcrumbsCache[pagePath]) {
      this.breadcrumbs = this.allBreadcrumbsCache[pagePath];
    }
  }

  public launchFullscreen() {
    let currentIsFullScreen = this._isFullScreen();
    currentIsFullScreen ? this._exitFullScreen() : this._requestFullScreen();
    this.isFullScreen = !currentIsFullScreen;
  }

  private _isFullScreen() {
    return !!document.webkitFullscreenElement || document.webkitIsFullScreen;
  }

  private _exitFullScreen() {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      return document.webkitCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    }
  }

  private _requestFullScreen() {
    let root = document.documentElement;
    if (root.requestFullscreen) {
      return root.requestFullscreen();
    } else if (root.webkitRequestFullScreen) {
      return root.webkitRequestFullScreen();
    } else if (root.webkitRequestFullscreen) {
      return root.webkitRequestFullscreen();
    }
  }
}

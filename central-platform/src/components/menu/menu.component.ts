import './menu.component.styl';

import { Component, ElementRef, Injectable, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NegBreadcrumb, NegUserProfile, NegAuth, NegTranslate, NegStorage, NegAjax, NegEventBus, NegGlobalLoading } from '@newkit/core';

@Component({
  selector: 'nk-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('menuPanelState', [
      state('show', style({
        'width': '100vw'
      })),
      state('hide', style({
        'width': '0'
      })),
      transition('show <=> hide', animate('500ms ease'))
    ]),
    trigger('langMenuState', [
      state('show', style({
        height: '*',
        width: '*'
      })),
      state('hide', style({
        height: 0,
        width: 0
      })),
      transition('show <=> hide', animate('300ms ease'))
    ]),
    trigger('categoryPanelState', [
      state('show', style({
        width: '*'
      })),
      state('hide', style({
        width: '220px'
      })),
      transition('show <=> hide', animate('300ms ease'))
    ]),
    trigger('quickLinksPanelState', [
      state('show', style({
        width: '220px'
      })),
      state('hide', style({
        width: '0'
      })),
      transition('show <=> hide', animate('300ms ease'))
    ])
  ]
})

@Injectable()
export class MenuComponent {

  @ViewChildren('niceScrollTarget') niceScrollTargets: QueryList<ElementRef>;

  @Input() menuData: Array<any>;
  @Input() menuMap: Map<string, any>;
  @Input() shown: boolean = false;
  @Output() shownChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  flatedMenu: Array<any>;
  filteredMenuData: Array<any>;

  quickLinksActived: boolean;
  selectedCategory: any;
  selectedSubCategory: any;

  private subs: any = [];
  private timerId: any;

  userInfo: any;
  staredUrls: Array<any>;
  favoriteMenus: Array<any>;
  mostUsedMenus: Array<any> = [];
  menuSearchText: string;
  langs = [
    { name: 'en-us', text: 'English (US)', icon: 'flag-us', alt: 'United States' },
    { name: 'zh-cn', text: '中文', icon: 'flag-cn', alt: 'China' },
    { name: 'zh-tw', text: '繁體中文', icon: 'flag-cn', alt: 'China Taiwan' }
  ];
  currentLang: string = 'en-us';
  showLangMenu: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private negAjax: NegAjax,
    private negAuth: NegAuth,
    private negStorage: NegStorage,
    private negUserProfile: NegUserProfile,
    private negTranslate: NegTranslate,
    private negEventBus: NegEventBus,
    private negGlobalLoading: NegGlobalLoading) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'nk-menu';
    this._initFavorateUrl();
    this._initMostUsedMenus();
    this.userInfo = this.negAuth.user;
    this.negUserProfile.get('baseSettings').then(profile => {
      profile = profile || {};
      this.currentLang = profile.language || NewkitConf.defaultLang || 'en-us';
    });
    this.negEventBus.on('quick-links-changed', (data) => {
      this.staredUrls = data;
      this._initFavorateUrl(data);
    });
    this.flatedMenu = [];
    this._flatMenuData(this.menuData, this.flatedMenu);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.selectedCategory && this.menuData && this.menuData.length > 0) {
        this.selectedCategory = this.menuData[0];
        if (this.selectedCategory.subMenus && this.selectedCategory.subMenus.length > 0) {
          this.selectedSubCategory = this.selectedCategory.subMenus[0];
        }
      }
    });
  }

  doLogout() {
    this.negStorage.cookie.remove('x-newkit-token');
    this.negAjax.get(`${NewkitConf.NewkitAPI}/logout`, {
      headers: { 'x-newkit-token': this.negAuth.newkitToken }
    });
    this.shown = false;
    setTimeout(() => {
      let url = `${NewkitConf.SSOAddress}/logout?redirect_url=${location.protocol}//${location.host}/logout`;
      location.href = url;
    }, 500);
  }

  clearMenuSearch() {
    this.menuSearchText = '';
    this.filteredMenuData = null;
  }

  menuFilterChange(value) {
    this.menuSearchText = value;
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      if (this.menuSearchText) {
        let _searchText = this.menuSearchText.toLowerCase();
        this.filteredMenuData = this.flatedMenu.filter(x => x._searchText.includes(_searchText));
      } else {
        this.filteredMenuData = null;
      }
    }, 300);
  }

  menuClick(evt, menu: any, m2?: any, m3?: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (menu.subMenus && menu.subMenus.length > 0) {
      return;
    }
    this.hideMenu();

    let url = menu.Url;
    this._setMostUsedUrls(menu);
    setTimeout(() => {
      if (menu.ModuleType === 'newkitjs') {
        this.router.navigate([`/system/newkitjs`], { fragment: url });
      } else {
        this.router.navigate([url]);
      }
    }, 400);
  }

  toggleLangMenu() {
    this.showLangMenu = !this.showLangMenu;
  }

  changeLanguage(lang) {
    this.negTranslate.use(lang);
    this.currentLang = lang;
    this.negUserProfile
      .get('baseSettings')
      .then(profile => {
        profile = profile || {};
        profile.language = lang;
        return profile;
      })
      .then(profile => {
        this.negUserProfile.set('baseSettings', profile);
      });
    this.showLangMenu = false;
  }

  hideMenu() {
    this.shown = false;
    this.showLangMenu = false;
    this.shownChange.emit(false);
    setTimeout(() => {
      this.menuSearchText = '';
    }, 200);
  }

  quickLinksMouseEnter(evt: any) {
    this.quickLinksActived = true;
  }

  quickLinksMouseLeave(evt: any) {
    this.quickLinksActived = false;
  }

  changeCategory(m1, evt) {
    this.selectedCategory = m1;
    this.selectedSubCategory = null;
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  changeSubCategory(m2, evt) {
    this.selectedSubCategory = m2;
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  private _setMostUsedUrls(menu: any) {
    let url = menu.Url;
    let index = _.findIndex(this.mostUsedMenus, x => x.Url === url);
    if (index !== -1) {
      this.mostUsedMenus[index]._count++;
    } else {
      if (this.mostUsedMenus.length > 20) {
        this.mostUsedMenus.pop();
      }
      this.mostUsedMenus.push({
        MenuName: menu.MenuName,
        MenuNameCn: menu.MenuNameCn,
        MenuNameTw: menu.MenuNameTw,
        ModuleType: menu.ModuleType,
        Url: menu.Url,
        _count: 1
      });
    }
    let mostUsedUrls = {};
    this.mostUsedMenus.forEach(x => mostUsedUrls[x.Url] = x._count);
    this.negUserProfile.set('most-used-menus', mostUsedUrls)
      .then(_ => { })
      .catch(_ => { });
  }

  private _initFavorateUrl(data?: any) {
    Promise.resolve(data || this.negUserProfile.get('staredUrls'))
      .then(data => {
        this.staredUrls = data || [];
        let menus = _.cloneDeep(this.menuData);
        let urls = this.staredUrls;
        menus = this._processFavMenuArr(menus, urls);
        this.favoriteMenus = menus;
      });
  }

  private _processFavMenuArr(menuArr, favUrls) {
    for (let i = 0; i < menuArr.length; i++) {
      if (menuArr[i].subMenus && menuArr[i].subMenus.length > 0) {
        menuArr[i].subMenus = this._processFavMenuArr(
          menuArr[i].subMenus,
          favUrls
        );
        if (menuArr[i].subMenus.length === 0) {
          menuArr.splice(i, 1);
          i--;
        }
        continue;
      }
      let url = menuArr[i].Url;
      if (
        !url ||
        favUrls.indexOf(url) < 0 ||
        menuArr[i].ModuleType === 'newkitjs'
      ) {
        menuArr.splice(i, 1);
        i--;
      }
    }
    return menuArr;
  }

  private _initMostUsedMenus() {
    this.negUserProfile.get('most-used-menus', true)
      .then(data => {
        let menuMap = _.cloneDeep(this.menuMap);
        let tempData = [];
        for (let url in data) {
          let targetMenu = menuMap.get(url);
          if (targetMenu) {
            targetMenu._count = data[url];
            tempData.push(targetMenu);
          }
        }
        tempData = _.orderBy(tempData, ['_count'], ['desc']);
        this.mostUsedMenus = _.take(tempData, 10);
        menuMap = null;
      })
      .catch(err => {
        console.log(err);
        this.mostUsedMenus = [];
      });
  }

  private _flatMenuData(menuArr: Array<any>, target: Array<any>) {
    menuArr.forEach(menu => {
      if (menu.subMenus && menu.subMenus.length > 0) {
        this._flatMenuData(menu.subMenus, target);
      } else {
        menu._searchText = `${menu.MenuName || ''}${menu.MenuNameCn || ''}${menu.MenuNameTw || ''}`.toLowerCase();
        target.push(menu);
      }
    });
  }
}

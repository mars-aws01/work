require('./user-setting.component.styl');

import { Component, DoCheck, OnInit } from '@angular/core';

import { NegUserProfile } from '@newkit/core';

@Component({
  selector: 'user-setting',
  templateUrl: 'user-setting.component.html'
})

export class UserSettingComponent implements OnInit {

  private _menuOnTop: boolean = false;
  private _fixedHeader: boolean = true;
  private _fixedNavigation: boolean = true;
  private _fixedPageFooter: boolean = false;
  private _showPageFooter: boolean = false;
  private skin: string = '';
  private initialized: boolean = false;
  public headerColorClassArr = [
    'blue', 'orange', 'green', 'purple', 'teal',
    'red', 'blue-grey', 'lime', 'indigo', 'default'
  ].map(c => {
    return {
      select: `header-switch-${c}`,
      value: `header-color-${c}`
    }
  });
  public headerColorClass = '';
  public navColorClassArr = [
    'blue', 'brown', 'green', 'purple', 'teal',
    'red', 'blue-grey', 'lime', 'indigo', 'default'
  ].map(c => {
    return {
      select: `nav-switch-${c}`,
      value: `nav-color-${c}`
    }
  });

  public navColorClass = '';
  private get menuOnTop() {
    return this._menuOnTop;
  }
  private set menuOnTop(val) {
    this._menuOnTop = val;
    this.setAppStyle();
  }
  private get fixedHeader() {
    return this._fixedHeader;
  }
  private set fixedHeader(val) {
    this._fixedHeader = val;
    !val && (this.fixedNavigation = false);
    this.setAppStyle();
  }
  private get fixedNavigation() {
    return this._fixedNavigation;
  }
  private set fixedNavigation(val) {
    this._fixedNavigation = val;
    val && (this.fixedHeader = true);
    this.setAppStyle();
  }
  private get fixedPageFooter() {
    return this._fixedPageFooter;
  }
  private set fixedPageFooter(val) {
    this._fixedPageFooter = val;
    this.setAppStyle();
  }

  private get showPageFooter() {
    return this._showPageFooter;
  }
  private set showPageFooter(val) {
    this._showPageFooter = val;
    this.setAppStyle();
  }

  constructor(private negUserProfile: NegUserProfile) {
  }

  ngOnInit() {
    this.negUserProfile.get('baseSettings')
      .then(profile => {
        if (profile) {
          this.skin = profile.skin;
          this.menuOnTop = profile.menuOnTop;
          this.fixedHeader = profile.fixedHeader !== false;
          this.fixedNavigation = profile.fixedNavigation !== false;
          this.showPageFooter = profile.showPageFooter;
          this.fixedPageFooter = profile.fixedPageFooter;
          this.headerColorClass = profile.headerColorClass || '';
          this.navColorClass = profile.navColorClass || '';
          setTimeout(() => {
            this.initialized = true;
          });
        }
      });
  }

  public resetSkinAndHeaderNavColor() {
    this.skin = 'smart-style-0';
    this.headerColorClass = '';
    this.navColorClass = '';
    this.fixedHeader = true;
    this.fixedNavigation = true;
    this.menuOnTop = false;
    this.showPageFooter = false;
    this.fixedPageFooter = false;
    this.changeHeaderColorClass(this.headerColorClass);
    this.changeNavColorClass(this.navColorClass);
    this.changeSkin(this.skin);
    this.updateUserProfile();
  }

  public changeHeaderColorClass(colorClass) {
    this.headerColorClass = colorClass;
    $('body')
      .removeClass(this.headerColorClassArr.map(c => c.value).join(' '))
      .addClass(colorClass);
    this.updateUserProfile();
  }

  public changeNavColorClass(colorClass) {
    this.navColorClass = colorClass;
    $('body')
      .removeClass(this.navColorClassArr.map(c => c.value).join(' '))
      .addClass(colorClass);
    this.updateUserProfile();
  }

  public changeSkin(item) {
    this.skin = item.name;
    let classArr = [
      'smart-style-0',
      'smart-style-1',
      'smart-style-2',
      'smart-style-3',
      'smart-style-4',
      'smart-style-5',
      'smart-style-6',
      'smart-style-default-2',
      'smart-style-dark-2',
      'blue-light'
    ];
    $('body')
      .removeClass(classArr.join(' '))
      .addClass(this.skin);
    this.updateUserProfile();
  }

  private setAppStyle() {
    let $body = $('body');
    this.menuOnTop ? $body.addClass('menu-on-top') : $body.removeClass('menu-on-top');
    this.fixedPageFooter ? $body.addClass('fixed-page-footer') : $body.removeClass('fixed-page-footer');
    $body.removeClass('fixed-header fixed-navigation fixed-ribbon');
    if (this.fixedHeader && this.fixedNavigation) {
      $body.addClass('fixed-header fixed-navigation fixed-ribbon');
    } else if (this.fixedHeader) {
      $body.addClass('fixed-header');
    }
    $('.page-footer')[this.showPageFooter ? 'removeAttr' : 'attr']('hidden', true);
    if (this.showPageFooter) { }
    if (this.initialized) {
      this.updateUserProfile();
    }
  }

  private updateUserProfile() {
    this.negUserProfile.get('baseSettings')
      .then(profile => {
        profile = profile || {};
        profile.menuOnTop = this.menuOnTop;
        profile.fixedHeader = this.fixedHeader;
        profile.fixedNavigation = this.fixedNavigation;
        profile.showPageFooter = this.showPageFooter;
        profile.fixedPageFooter = this.fixedPageFooter;
        profile.skin = this.skin;
        profile.headerColorClass = this.headerColorClass;
        profile.navColorClass = this.navColorClass;
        return profile;
      })
      .then(profile => {
        this.negUserProfile.set('baseSettings', profile);
      });
  }
}

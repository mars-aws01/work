require('./menu.component.styl');

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NegAjax, NegAlert, NegAuth, NegUtil } from '@newkit/core';

import { MenuIcons } from './menu-icons';

const authTypes = ['public', 'newegg', 'keystone'];
declare let wjcNav
@Component({
  templateUrl: './menu-setting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSettingComponent implements OnInit {

  private menuData: Array<any> = [];
  private ajaxOpt: {};
  private isModalShown: boolean = false;
  private menuIcons = MenuIcons;
  private currentMenu: any = {};
  private menuModalTitle: string;
  private systemList: Array<any>;
  private moduleList: Array<any>;
  private applications: Array<any>;
  private matchedModuleList: Array<any>;
  private _menuData = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private negAjax: NegAjax,
    private negAuth: NegAuth,
    private negAlert: NegAlert,
    private negUtil: NegUtil) {

  }

  ngOnInit() {
    this.ajaxOpt = {
      headers: { 'x-newkit-token': this.negAuth.authData.newkitToken }
    };
    this.applications = Object.keys(NewkitConf.Applications).map(key => ({
      id: NewkitConf.Applications[key],
      name: key
    }));
    this.loadMenu();
  }

  loadMenu() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/menu`, this.ajaxOpt)
      .then(({ data }) => {
        let menus = data;
        menus.forEach(m => {
          m.IsNewkit1Page = m.ModuleType === 'newkitjs';
          m.isActived = m.Status === 'Active';
        });
        menus = menus.filter(m => !m.IsNewkit1Page);
        let result = [];
        this.processMenuData(menus, result, 0);
        this.menuData = _.cloneDeep(result);
        this.changeDetectorRef.markForCheck();
      });
  }

  processMenuData(source, target, parentId, level = 0): void {
    let arr = source
      .filter(x => x.ParentId === parentId)
      .sort((x1, x2) => (x1.Sort || 0) - (x2.Sort || 0));
    arr.forEach(m => {
      m.Level = level;
      target.push(m);
      this.processMenuData(source, target, m.Id, level + 1);
    });
  }

  loadSystemAndModule() {
    this.negAjax
      .get(`${NewkitConf.NewkitAPI}/permission/system`, this.ajaxOpt)
      .then(({ data }) => {
        this.systemList = data;
      });
    this.negAjax
      .get(`${NewkitConf.NewkitAPI}/permission/module`, this.ajaxOpt)
      .then(({ data }) => {
        this.moduleList = data;
      });
  }

  onSystemChange() {
    this.matchedModuleList = this.moduleList.filter(
      x => x.SystemKey === this.currentMenu.permissionSystemId
    );
  }

  doMenuOperate(evt, opType, menu) {
    evt.stopPropagation();
    switch (opType) {
      case 'edit':
        this.doMenuEdit(menu);
        break;
      case 'addChild':
        this.doMenuAdd(menu);
        break;
      case 'delete':
        this.doMenuDelete(menu);
        break;
    }
  }

  addRootMenu() {
    if (NewkitConf.env === 'prd' && !this.negAuth.hasFunctionByAppName('NeweggCentral 2.0', 'RootMenu_Maintain')) {
      let a = document.createElement('a');
      let subject = `Add root menu in newkit.`;
      let body = `Dear newkit admin, \n\n    We want to add root menu named ________ , it is used to ___________________ .`;
      let cc = 'gpteammisnesccnbackendtechsupport@newegg.com';
      a.setAttribute(
        'href',
        `mailto:Garry.X.Gu@newegg.com?cc=${cc}&Subject=${this.negUtil.encodeUri(
          subject
        )}&Body=${this.negUtil.encodeUri(body)}`
      );
      a.click();
      return;
    }
    this.doMenuAdd({ Id: 0, Sort: 100 });
  }

  doMenuAdd(menu) {
    this.menuModalTitle = 'Create new menu';
    this.currentMenu = {
      AuthorizeType: 'public',
      IconClass: '',
      ParentId: menu.Id,
      IsActived: true,
      ModuleType: 'newkit',
      Sort: 100,
      Description: '',
      Url: ''
    };
    this.isModalShown = true;
  }

  doMenuEdit(menu) {
    this.menuModalTitle = `Edit [${menu.MenuName}]`;
    this.currentMenu = _.cloneDeep(menu);
    this.currentMenu.IsActived = this.currentMenu.Status === 'Active';
    if (authTypes.indexOf(this.currentMenu.AuthorizeType) < 0) {
      this.currentMenu.AuthorizeType = 'public';
    }
    this.isModalShown = true;
  }

  saveMenu() {
    if (this.currentMenu.Id) {
      // Update
      this.negAjax
        .put(
        `${NewkitConf.NewkitAPI}/menu/${this.currentMenu.Id}`,
        this.currentMenu,
        this.ajaxOpt
        )
        .then(() => {
          this.negAlert.success('Update menu successfully.');
          this.loadMenu();
          this.isModalShown = false;
        });
    } else {
      // Add
      this.negAjax
        .post(
        `${NewkitConf.NewkitAPI}/menu/new`,
        this.currentMenu,
        this.ajaxOpt
        )
        .then(() => {
          this.negAlert.success('Add menu successfully.');
          this.loadMenu();
          this.isModalShown = false;
        });
    }
  }

  doMenuDelete(menu) {
    this.negAlert.confirm(
      'Sure to delete the menu?',
      () => {
        this.negAjax
          .delete(`${NewkitConf.NewkitAPI}/menu/${menu.Id}`, this.ajaxOpt)
          .then(() => {
            this.loadMenu();
            this.negAlert.info('Delete menu successfully.');
          });
      },
      null
    );
  }

  editMenuHide() {
    this.currentMenu = null;
  }
}

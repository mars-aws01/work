import { Injectable } from '@angular/core';

import { NegEventBus } from './negEventBus';

@Injectable()
export class NegMultiTab {

  constructor(
    private negEventBus: NegEventBus
  ) { }

  openPage(path: string, queryParams?: any, newTab: boolean = true) {
    this.negEventBus.emit('global.tabNavigation', {
      newTab: !!newTab,
      href: path,
      queryParams: queryParams
    })
  }

  setCurrentTabName(value: any) {
    value = this.processMultiLang(value);
    this.negEventBus.emit('global.setTabName', value);
  }

  private processMultiLang(value) {
    let result: any = { MenuName: value['en-us'], Url: value.url };
    result.MenuNameCn = value['zh-cn'] || result.MenuName;
    result.MenuNameTw = value['zh-tw'] || result.MenuName;
    return result;
  }
}

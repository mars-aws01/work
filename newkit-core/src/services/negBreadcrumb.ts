import { Injectable } from '@angular/core';

import { NegEventBus } from './negEventBus';

@Injectable()
export class NegBreadcrumb {

  constructor(
    private negEventBus: NegEventBus
  ) { }

  setBreadcrumbs(breadcrumbs) {
    if (!_.isArray(breadcrumbs)) {
      return;
    }
    breadcrumbs = breadcrumbs.map(x => this.processBreadcrumb(x));
    this.negEventBus.emit('global.setBreadcrumbs', { force: true, breadcrumbs });
  }

  setLastBreadcrumb(lastBreadcrumb) {
    let breadcrumb = this.processBreadcrumb(lastBreadcrumb);
    this.negEventBus.emit('global.setLastBreadcrumb', breadcrumb);
  }

  private processBreadcrumb(breadcrumb) {
    let result: any = { MenuName: breadcrumb['en-us'], Url: breadcrumb.url };
    result.MenuNameCn = breadcrumb['zh-cn'] || result.MenuName;
    result.MenuNameTw = breadcrumb['zh-tw'] || result.MenuName;
    return result;
  }
}

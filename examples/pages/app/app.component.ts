import './app.component.styl';

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { version } from '../../../src';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  private currentSelectMenu: MenuItem;

  public menuData: Array<MenuItem> = [];
  public smartAdminVersion: string = '';

  constructor(private router: Router) {
    this.smartAdminVersion = version;
  }

  ngOnInit() {
    this.menuData = AppConf.menuData.slice(0);
  }

  toggleMenuState(menu: any) {
    this.menuData.forEach(m => m !== menu && (m.open = false));
    menu.open = !menu.open;
  }
}

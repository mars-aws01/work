import { Injectable } from '@angular/core';
import { NegAuth } from '@newkit/core';

@Injectable()
export class MenuService {

  constructor(
    private negAuth: NegAuth
  ) { }

  public getMenuData() {
    return this.negAuth.authData.menus;
  }
}

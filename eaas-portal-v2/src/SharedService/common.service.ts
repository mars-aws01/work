import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable()
export class CommonService {

  get currentUser(): any{
    return _window()._currentUser;
  }

  set currentUser(value: any){
    _window()._currentUser = value;
  }
}
import { Injectable } from '@angular/core';

@Injectable()
export class ArrayHelper {

  constructor() { }

  removeValue(arr: any[], value: any) {
    return arr.filter(x => x !== value);
  }

  addValue(arr: any[], value: any) {
    let result = arr.slice();
    if (!result.includes(value)) {
      result.push(value);
    }
    return result;
  }
}

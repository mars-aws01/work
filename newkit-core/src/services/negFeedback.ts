import { Injectable } from '@angular/core';

const modulePersonMap = new Map<string, string>();

@Injectable()
export class NegFeedback {

  constructor() { }

  /**
   * 注册模块收件人
   * @param moduleName 模块名称
   * @param recipient 收件人
   */
  public registerModule(moduleName: string, recipient: string) {
    modulePersonMap.set(moduleName, recipient);
  }

  /**
   * 通过模块名称，获取动态设置的收件人
   * @param  {string} moduleName 模块名称
   */
  public getModuleRecipient(moduleName: string) {
    if (modulePersonMap.has(moduleName)) {
      return modulePersonMap.get(moduleName) || '';
    }
    return '';
  }
}
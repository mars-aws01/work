import { Pipe, PipeTransform, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const langKeyMapping = {
  'en-us': '',
  'zh-cn': 'Cn',
  'zh-tw': 'Tw'
};

@Pipe({
  name: 'prefixTranslate',
  pure: false
})
export class PrefixTranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {

  }

  transform(value: any, args: any): any {
    let prefix = args;
    if (!value) return value;
    let lang = this.translateService.currentLang || this.translateService.getDefaultLang();
    return value[`${prefix}${langKeyMapping[lang]}`] || value[prefix];
  }
}

import { Pipe, PipeTransform, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const langKeyMapping = {
  'en-us': 'MenuName',
  'zh-cn': 'MenuNameCn',
  'zh-tw': 'MenuNameTw'
};

@Pipe({
  name: 'menuTranslate',
  pure: false
})
export class MenuTranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {

  }

  transform(value: any, args: any[]): any {
    let lang = this.translateService.currentLang || this.translateService.getDefaultLang();
    return value[langKeyMapping[lang]] || value['MenuName'];
  }
}

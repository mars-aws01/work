import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export declare class PrefixTranslatePipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(value: any, args: any): any;
}

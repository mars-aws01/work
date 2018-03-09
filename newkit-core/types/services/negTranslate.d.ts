import { TranslateService } from '@ngx-translate/core';
export declare class NegTranslate {
    private translateService;
    constructor(translateService: TranslateService);
    use(lang: string): void;
    set(moduleName: any, langObj: any): void;
    get(key: string | string[]): any;
    getCurrentLang(): string;
}

import { ALL_PAGES, AppComponent } from './pages';
import { ALL_SERVICES, ModuleLoaderService } from './services';
import { BrowserModule, Title } from '@angular/platform-browser';
import {
  CORE_PIPES,
  CORE_SERVICES,
  NegTranslate,
  NkCoreModule,
  TranslateLoader,
  TranslateModule
} from '@newkit/core';

import { ALL_COMPONENTS } from './components';
import { ALL_PIPES } from './pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import langObj from './i18n';
import { routing } from './app.routing';
import { GlobalErrorHandler } from './error-handler';

@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule,
    RouterModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    routing
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS, ...ALL_PIPES],
  providers: [
    ...CORE_SERVICES,
    ...CORE_PIPES,
    ...ALL_SERVICES,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private moduleLoaderService: ModuleLoaderService, private negTranslate: NegTranslate, private title: Title) {
    negTranslate.set('central', langObj);
    window['CKEDITOR'].basePath = 'http://cdn.newegg.org/ckeditor/4.7.2/';
    window['CKEDITOR_BASEPATH'] = 'http://cdn.newegg.org/ckeditor/4.7.2/';
    if (NewkitConf.defaultLang) {
      negTranslate.use(NewkitConf.defaultLang);
    }
    if (NewkitConf.title) {
      this.title.setTitle(NewkitConf.title);
    }
  }
}

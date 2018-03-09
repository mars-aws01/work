import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ALL_COMPONENTS } from './components';
import { CKEditorModule } from 'ngx-ckeditor';
import { CORE_PIPES } from './pipes';
import { CommonModule } from '@angular/common';
import { KendoWijmoModule } from 'kendo-wijmo';
import { KubiUIModule } from '@newkit/kubi-ui';
import { NegTranslate } from './services';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import langObj from './i18n';

// import { SmartAdminModule } from 'ngx-smartadmin';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    // SmartAdminModule,
    KubiUIModule
  ],
  declarations: [...ALL_COMPONENTS, ...CORE_PIPES],
  exports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    KendoWijmoModule, // Kendo 和 Wijmo 合集
    // SmartAdminModule,
    KubiUIModule,
    CKEditorModule,
    ...ALL_COMPONENTS,
    ...CORE_PIPES
  ]
})
export class NkCoreModule {
  constructor(private negTranslate: NegTranslate) {
    negTranslate.set('core', langObj);
  }
}

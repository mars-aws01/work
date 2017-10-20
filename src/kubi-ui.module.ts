import './styl/all.styl';

import { CORE_DIRECTIVES, CORE_SERVICES } from './core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ALL_COMPONENTS } from './components';
import { CommonModule } from '@angular/common';
import { HELPERS } from './helpers';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...ALL_COMPONENTS, ...CORE_DIRECTIVES],
  entryComponents: [],
  exports: [...ALL_COMPONENTS, ...CORE_DIRECTIVES],
  providers: [...HELPERS, ...CORE_SERVICES]
})
export class KubiUIModule {

}

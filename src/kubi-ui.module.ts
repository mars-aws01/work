import './styl/all.styl';

import { ALL_COMPONENTS, ENTRY_COMPONENTS } from './components';
import { CORE_DIRECTIVES, CORE_SERVICES } from './core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HELPERS } from './helpers';
import { NgModule } from '@angular/core';
import { NkValidators } from './components/validators';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...ALL_COMPONENTS, ...CORE_DIRECTIVES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [...ALL_COMPONENTS, ...CORE_DIRECTIVES],
  providers: [...HELPERS, ...CORE_SERVICES, NkValidators]
})
export class KubiUIModule {}

import './styl/all.styl';

import { ALL_COMPONENTS, ENTRY_COMPONENTS } from './components';
import { COMMON_COMPONENTS } from './common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CORE_SERVICES } from './core';
import { CommonModule } from '@angular/common';
import { HELPERS } from './helpers';
import { NgModule } from '@angular/core';
import { NkValidators } from './components/validators';
import { from } from 'rxjs/observable/from';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...ALL_COMPONENTS, ...COMMON_COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [...ALL_COMPONENTS],
  providers: [...HELPERS, ...CORE_SERVICES, NkValidators]
})
export class KubiUIModule { }

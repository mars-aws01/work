import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { ALL_SERVICES } from './services';
import { ALL_PAGES } from './pages';
import { ALL_COMPONENTS } from './components';
import { ALL_DIRECTIVES } from './directives';
import { ALL_PIPES } from './pipes';
import { AppComponent } from './pages/login/app.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { SharedModule } from '../SharedService/shared.module';
import { ModalBackdropComponent } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule, BusyConfig } from 'angular2-busy';

@NgModule({
  declarations: [
    AppComponent,
    ...ALL_PAGES,
    ...ALL_DIRECTIVES,
    ...ALL_COMPONENTS,
    ...ALL_PAGES,
    ...ALL_PIPES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    SharedModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    CollapseModule.forRoot(),
    BusyModule,
    ModalModule,
    BrowserAnimationsModule

  ],
  providers: [
    ...ALL_SERVICES
  ],
  entryComponents: [ModalBackdropComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

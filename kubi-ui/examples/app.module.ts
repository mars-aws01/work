import './styl/common.styl';
import './styl/github-markdown.css';

import { AppComponent, PAGE_COMPONENTS } from './pages';

import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { COMPONENTS } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { KubiUIModule } from '../src';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    KubiUIModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS, ...PAGE_COMPONENTS],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}

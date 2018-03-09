require('./logout.scss');
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  public loginUrl: any;

  constructor(private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.loginUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${NewkitConf.SSOAddress}/login?redirect_url=${location.protocol}//${location.host}/login`);
  }
}

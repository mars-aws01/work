import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../../SharedService/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public commonService: CommonService){
    commonService.currentUser = {userName:'doris'};
  }
}
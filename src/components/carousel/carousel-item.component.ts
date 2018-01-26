import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'nk-carousel-item',
  templateUrl: 'carousel-item.component.html'
})

export class CarouselItemComponent implements OnInit {

  @ViewChild('imgEle')
  imgEle: ElementRef;

  public active = false; // 是否激活
  public isFirstItem = false; // 第一个Item
  public rootDiv: any;
  public imgWidth: any = 0;
  public imgHeight: any = 0;
  public imgLoaded: boolean;

  @Input()
  public imgUrl: string = '';

  constructor(public elementRef: ElementRef) {

  }

  ngOnInit() {
    this.rootDiv = this.elementRef.nativeElement.querySelector('div');
  }

  loaded(event: any) {
    this.imgWidth = this.imgEle.nativeElement.width;
    this.imgHeight = this.imgEle.nativeElement.height;
    this.imgLoaded = true;
  }

  loadError(evt: any) {
    this.imgLoaded = true;
  }
}

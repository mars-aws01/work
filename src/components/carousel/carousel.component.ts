import './carousel.component.styl';

import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';

import { CarouselItemComponent } from './carousel-item.component';

@Component({
  selector: 'nk-carousel',
  templateUrl: 'carousel.component.html'
})
export class CarouselComponent implements OnInit {
  private intervalId: any;
  public innerIndex: number = 0;
  private pause: boolean = false; // 是否暂停播放

  @Input() public animateType: string = 'slide';
  @Input() public autoplay: boolean = true;
  @Input() public interval: number = 3000;
  @Output() public change: EventEmitter<number> = new EventEmitter();
  @ContentChildren(CarouselItemComponent) public items: QueryList<CarouselItemComponent>;

  public get onlyOneItem() {
    return this.items.length <= 1;
  }

  private _maxHeight: any;
  public get maxHeight() {
    let items = this.items.toArray();
    let allLoaded = !!items.find(x => !x.imgLoaded);
    if (allLoaded && this._maxHeight) {
      return this._maxHeight;
    }
    let itemWidth = items.map(x => x.rootDiv.offsetWidth).find(x => x > 0);
    let maxHeight = Math.max(...items.map(x => {
      if (x.imgWidth === 0) return 0;
      return (itemWidth / x.imgWidth) * x.imgHeight;
    }));
    this._maxHeight = Math.floor(maxHeight || 0);
    return this._maxHeight;
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngOnChange(changes: SimpleChanges) {
    if (changes.autoplay || changes.interval) {
      this.setAutoplay();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let firstItem = this.items.toArray()[0];
      if (firstItem) {
        firstItem.isFirstItem = true;
        firstItem.active = true;
      }
      this.setAutoplay();
    });
  }

  public handleMouseEnter() {
    this.pause = true;
  }
  public handleMouseLeave() {
    this.pause = false;
  }

  private setAutoplay() {
    clearInterval(this.intervalId);
    if (this.autoplay) {
      this.intervalId = setInterval(() => {
        if (!this.pause) {
          if (!this.onlyOneItem) {
            this.next();
          }
        }
      }, this.interval);
    }
  }

  public prev() {
    let prevIdx = this.innerIndex - 1;
    prevIdx = prevIdx < 0 ? this.items.length - 1 : prevIdx;
    this.slide(prevIdx, 'prev');
  }

  public next() {
    let nextIdx = this.innerIndex + 1;
    nextIdx = nextIdx > this.items.length - 1 ? 0 : nextIdx;
    this.slide(nextIdx);
  }

  public slide(idx: number, type = 'next') {
    let activeIndex = this.innerIndex; // Current
    this.innerIndex = idx; // Next
    let itemArray = this.items.toArray();
    let activeItem = itemArray[activeIndex];
    let nextItem = itemArray[this.innerIndex];
    if (this.animateType === 'slide') {
      let dir = type == 'next' ? 'left' : 'right';
      // nextItem.setDirection(dir, 600, true);
      this.renderer.addClass(nextItem.rootDiv, type);
      setTimeout(() => {
        this.renderer.addClass(nextItem.rootDiv, dir);
        this.renderer.addClass(activeItem.rootDiv, dir);
      });
      setTimeout(() => {
        this.removeClass(activeItem.rootDiv, `${dir} active`);
        this.removeClass(nextItem.rootDiv, `${type} ${dir}`);
        this.renderer.addClass(nextItem.rootDiv, 'active');
      }, 600);
    } else {
      setTimeout(() => {
        activeItem.active = false;
        nextItem.active = true;
      });
    }
    this.change.emit(this.innerIndex);
  }

  private removeClass(el: any, klass: string) {
    (klass || '').split(' ').forEach(name => {
      this.renderer.removeClass(el, name);
    });
  }
}

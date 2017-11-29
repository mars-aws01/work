import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { TabsetComponent } from './tabset.component';

@Component({
  selector: 'nk-tab-item',
  template: `<ng-content></ng-content>`
})
export class TabItemComponent implements OnInit, OnChanges {

  public innerName: string;
  private _active: boolean = false;
  public get active() { return this._active; }
  public set active(val) {
    this._active = val;
    this.renderer[val ? 'addClass' : 'removeClass'](this.elementRef.nativeElement, 'active');
  }

  @Input()
  public name: string;

  @Input()
  public header: string;

  @Input()
  public icon: string;

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private tabset: TabsetComponent
  ) {
  }

  ngOnInit() {
    this.tabset.addTab(this);
    this.elementRef.nativeElement.className = 'nk-tab-item';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.innerName = name;
    }
  }

  ngOnDestroy() {
    this.tabset.removeTab(this);
  }
}

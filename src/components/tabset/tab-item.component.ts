import { Component, ElementRef, Input, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';

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
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', val);
  }

  @Input()
  public name: string;

  @Input()
  public header: string;

  @Input()
  public icon: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private tabset: TabsetComponent
  ) {
  }

  ngOnInit() {
    this.tabset.tabItems.push(this);
    this.elementRef.nativeElement.className = 'nk-tab-item tab-pane';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.innerName = name;
    }
  }
}

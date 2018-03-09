import './tabset.component.styl';

import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

import { TabItemComponent } from './tab-item.component';

@Component({
  selector: 'nk-tabset',
  templateUrl: 'tabset.component.html'
})
export class TabsetComponent implements OnInit, AfterViewInit {
  private _currentTabItem: TabItemComponent;
  public tabItems: TabItemComponent[] = [];
  private isDestroyed = false;

  @Input() selected: string;
  @Input() tabsLeft: boolean = false;
  @Input() headerWidth: number = 80;
  @Output() selectedChange = new EventEmitter();

  public get headerStyle() {
    if (!this.tabsLeft) {
      return {};
    }
    return {
      width: `${this.headerWidth}px`
    };
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {      
      this._processSelectedChange(this.selected);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._processSelectedChange(this.selected);
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  public setActiveItem(tabItem: TabItemComponent) {
    if (this._currentTabItem === tabItem) {
      return;
    }
    if (this._currentTabItem) {
      this._currentTabItem.active = false;
    }
    this._currentTabItem = tabItem;
    this._currentTabItem.active = true;
    this.selectedChange.emit(this._currentTabItem.innerName);
  }

  public addTab(tab: TabItemComponent): void {
    this.tabItems.push(tab);
    if (!tab.innerName) {
      tab.innerName = `tabpane-${this.tabItems.length - 1}`;
    }
    if (!this.selected) {
      tab.active = this.tabItems.length === 1 && !tab.active;
    }    
    if (tab.active) {
      setTimeout(() => {
        this.setActiveItem(tab);
      });
    }
  }

  public removeTab(tab: TabItemComponent) {
    const index = this.tabItems.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    this.tabItems.splice(index, 1);
    if (tab.elementRef.nativeElement.parentNode) {
      this.renderer.removeChild(tab.elementRef.nativeElement.parentNode, tab.elementRef.nativeElement);
    }
    if (this.tabItems.length > 0 && this.tabItems.filter(x => x.active).length === 0) {
      this.setActiveItem(this.tabItems[this.tabItems.length - 1]);
    }
  }

  private _processSelectedChange(name: string) {    
    let findTabItem = this.tabItems.find(x => x.innerName === name) || this.tabItems[0];
    if (findTabItem) {
      this.setActiveItem(findTabItem);
    }
  }
}

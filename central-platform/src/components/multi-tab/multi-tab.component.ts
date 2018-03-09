import './multi-tab.component.styl';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MultiTabItemComponent } from './multi-tab-item.component';

@Component({
  selector: 'nk-multi-tab',
  templateUrl: 'multi-tab.component.html',
  exportAs: 'multi-tab'
})

export class MultiTabComponent implements OnInit {

  private _currentTabItem: MultiTabItemComponent;
  public tabItems: MultiTabItemComponent[] = [];

  @Input() data: any[] = [];
  @Output() dataChange = new EventEmitter();
  @Input() selected: string;
  @Output() selectedChange = new EventEmitter();

  constructor(
    private _location: Location,
    private _router: Router) {

  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this._processSelectedChange(this.selected);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._setTabItemsName();
      this._processSelectedChange(this.selected);
    });
  }

  public setActiveWithName(name: string) {
    this._processSelectedChange(name);
  }

  public refresh(index: number) {
    if (index < 0 || index > this.tabItems.length - 1) return;
    let findTab = this.tabItems[index];
    if (!findTab) return;
    findTab.refresh();
  }

  public removeTab(index: number) {
    let findTab = this.tabItems[index];
    if (!findTab || (this.tabItems.length === 1 && findTab.name === '/')) {
      return;
    }
    findTab.destroy()
      .then(result => {
        if (result) {
          this.tabItems.splice(index, 1);
          this.data.splice(index, 1);
          this.dataChange.emit(this.data);
          if (this.selected === findTab.name) {
            if (this.tabItems.length === 0) {
              this._router.navigateByUrl('/');
            } else {
              let selected = this.tabItems[Math.min(index, this.tabItems.length - 1)].name;
              this.selected = selected;
              this.selectedChange.emit(this.selected);
            }
          }
        }
      })
  }

  public closeOtherTabs(index: number) {
    if (index < 0 || index > this.tabItems.length - 1) return;

    for (let i = 0; i < this.tabItems.length; i++) {
      if (i === index) continue;
      this.tabItems[i].destroy();
    }
    this.tabItems = [this.tabItems[index]];
    this.data = [this.data[index]];
    this.dataChange.emit(this.data);
  }

  public closeAllTabs() {
    let homeIndex = -1;
    for (let i = 0; i < this.tabItems.length; i++) {
      if (this.tabItems[i].name === '/') {
        homeIndex = i;
        continue;
      }
      this.tabItems[i].destroy();
    }

    if (homeIndex !== -1) {
      this.tabItems = [this.tabItems[homeIndex]];
      this.data = [this.data[homeIndex]];
    } else {
      this.tabItems = [];
      this.data = [];
    }
    this.dataChange.emit(this.data);
    setTimeout(() => {
      if (homeIndex === -1) {
        this._router.navigateByUrl('/');
      } else {
        this.setActiveItem(this.tabItems[0]);
      }
    }, 100);
  }

  public setActiveItem(tabItem: MultiTabItemComponent) {
    if (this._currentTabItem === tabItem) {
      return;
    }
    let tabCanDeactivePromise = this._currentTabItem ? this._currentTabItem.canDeactive() : true;
    Promise.resolve(tabCanDeactivePromise)
      .then(tabCanDeactive => {
        tabCanDeactive = !!tabCanDeactive;
        if (tabCanDeactive) {
          if (this._currentTabItem) {
            this._currentTabItem.active = false;
          }
          this._currentTabItem = tabItem;
          this._currentTabItem.active = true;

        }
        setTimeout(() => {
          this._router.navigateByUrl(this._currentTabItem.fullUrl);
          this.selectedChange.emit(this._currentTabItem.innerName);
        });
      })
      .catch(err => {
        console.log(`[MultiTab SetActiveItem] ${err}`);
      })
  }

  private _processSelectedChange(name: string) {
    let findTabItem = this.tabItems.find(x => x.innerName === name) || this.tabItems[0];
    if (findTabItem) {
      this.setActiveItem(findTabItem);
    }
  }

  private _setTabItemsName() {
    this.tabItems.forEach((item: MultiTabItemComponent, idx: number) => {
      if (!item.innerName) {
        item.innerName = `tabpane-${idx}`;
      }
    });
  }
}

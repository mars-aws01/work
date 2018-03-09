import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[nk-tree-item]',
  templateUrl: 'tree-item.component.html'
})
export class TreeItemComponent implements OnInit {

  @Input('nk-tree-item')
  private treeItem: any;

  @Input()
  private treeOpt: { showIcon: boolean, showCheckbox: boolean };

  @Output()
  private itemClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  private onChildItemClick($event, item) {
    $event && $event.stopPropagation();
    this.itemClick.emit(item);
  }
}
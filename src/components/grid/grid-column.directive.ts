import {
  ContentChild,
  Directive,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';

import { GridCellDirective } from './column-cell.directive';

@Directive({
  selector: 'nk-grid-column'
})
export class GridColumnDirective implements OnInit {
  private get styleWidth() {
    return this.width === 'auto' ? 'auto' : `${this.width}px`;
  }

  public sort: string = '';

  @Input() header: string = '';
  @Input() field: string;
  @Input() width: number | string = 'auto';
  @Input() sortable: boolean = false;
  
  @Input()
  @ContentChild(GridCellDirective, { read: TemplateRef })
  cellTemplate: TemplateRef<any>;

  ngOnInit() {}
}

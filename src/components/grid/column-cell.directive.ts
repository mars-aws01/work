import { Directive, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nkGridCellTemplate]'
})
export class GridCellDirective implements OnInit {
  constructor(public template: TemplateRef<any>) {

  }
  ngOnInit() {

  }
}
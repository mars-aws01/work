import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DROP_DOWN_GRID_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropDownGridComponent),
  multi: true
};

@Component({
  selector: 'nk-drop-down-grid',
  templateUrl: 'drop-down-grid.component.html',
  providers: [DROP_DOWN_GRID_VALUE_ACCESSOR]
})

export class DropDownGridComponent implements OnInit, ControlValueAccessor {

  private innerValue: any;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  private el: any;
  private showPopupPanel: boolean = false;
  private onDocumentClick = e => {
    this.showPopupPanel = false;
  }

  @Input()
  private columns: Array<any> = [];

  @Input()
  private dataSource: Array<any> | Function = [];

  @Input()
  private key: string = '';

  @Output()
  private onSelectChanged: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.el = this.elementRef.nativeElement.querySelector('input');
    this.el.addEventListener('click', e => {
      e.stopPropagation();
      this.showPopupPanel = true;
    }, false);
    document.addEventListener('click', this.onDocumentClick, false);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  public onRowClick(rowData) {
    this.innerValue = (rowData || {})[this.key];
    this.onChange(this.innerValue);
    this.onSelectChanged.emit(rowData);
  }

  public writeValue(value: any): void {
    this.innerValue = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
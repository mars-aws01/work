import { Component, OnInit, OnDestroy, Input, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DROP_DOWN_LIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropDownListComponent),
  multi: true
};

@Component({
  selector: 'nk-drop-down-list',
  templateUrl: 'drop-down-list.component.html',
  providers: [DROP_DOWN_LIST_VALUE_ACCESSOR]
})
export class DropDownListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private showPopupPanel: boolean = false;
  private innerText: string = '';
  private onDocumentClick = e => {
    this.showPopupPanel = false;
  }
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  @Input()
  private dataSource: Array<any> = [];

  @Input()
  private multi: boolean = false;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    let el = this.elementRef.nativeElement;
    let input = el.querySelector('input');
    input.addEventListener('click', (e) => {
      this.showPopupPanel = true;
    });
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    document.addEventListener('click', this.onDocumentClick, false);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  public dropdownItemClick(item, evt) {
    !this.multi && evt && evt.preventDefault();
    if (!this.multi) {
      this.showPopupPanel = false;
      this.dataSource.forEach(x => x.checked = x === item);
    }
    this.setNgModelValue();
  }

  private setNgModelValue() {
    setTimeout(() => {
      let values = [];
      let texts = [];
      this.dataSource
        .filter(x => x.checked)
        .forEach(x => {
          values.push(x.value);
          texts.push(x.text);
        });
      this.innerText = texts.join(',');
      this.onChange(values);
    });
  }

  public writeValue(value: any): void {
    value = value || [];
    if (!_.isEqual(value, this.dataSource)) {
      if (!this.multi && value.length > 1) {
        value.length = 1;
      }
      this.dataSource.forEach(x => {
        x.checked = value.indexOf(x.value) >= 0;
      });
      this.setNgModelValue();
    }
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'collapse-zone',
    template: `<div style="
                    border-top: none;
                    border-bottom:1px solid #E6E6E6;
                    border-left: none;
                    border-right: none;
                    width: 100% ">
      <a style="text-decoration: none; cursor: pointer;">
        <span style="font-size:2rem"><i class="fa fa-sort-desc" aria-hidden="false" [ngClass]="{'rotate-minus-90': model }"></i></span>
        &nbsp;{{collapseTitle}}
        &nbsp;<span><b> {{ count }} </b></span>
      </a>
    </div>`,
    styleUrls: ['./collapse-zone.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CollapseZoneComponent),
        multi: true
    }]
})

export class CollapseZoneComponent implements ControlValueAccessor {
    @Input() collapseTitle: string;
    @Input() count: string;
    @Input() set rotate(value: boolean) {
        this.model = value;
    }

    constructor() {
        
    }

    public model = true;

    public onModelChange: Function = () => { };
    public onModelTouched: Function = () => { };
    writeValue(value: any) {
        this.model = value;
    }
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }
    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }


}

## nk-time-range

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| disabled | boolean | | false | 禁用时间选择器 |
| placeholder | string | | | |
| ngModel | Date | Y | - | 当前选中时间范围: `{from: Date, to: Date}` |
 
**Usage**
```html
<nk-time-range [(ngModel)]="timerange"></nk-time-range>
<nk-time-range [(ngModel)]="timerange" placeholder="Select Time Range"></nk-time-range>
<nk-time-range [(ngModel)]="timerange" [disabled]="true"></nk-time-range>
```

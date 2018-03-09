## nk-date-range

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| disabled | boolean | | false | 禁用日期选择器 |
| placeholder | string | | | |
| minDate | Date | | - | 最小可选日期 |
| maxDate | Date | | - | 最大可选日期 |
| allowClear | boolean | | false | 是否允许清空日期 |
| ngModel | Date | Y | - | 当前选中日期范围 `{from: Date, to: Date}` |
 
**Usage**
```html
<nk-date-range [(ngModel)]="range" placeholder="Select Date Range" [maxDate]="maxDate"></nk-date-range>
<nk-date-range [(ngModel)]="range" [disabled]="true"></nk-date-range>
```

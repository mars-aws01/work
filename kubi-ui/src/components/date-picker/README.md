## nk-date-picker

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| disabled | boolean | | false | 禁用日期选择器 |
| mode | string | | day | 日期选择器类型，可选值`day` `month` `year` |
| placeholder | string | | | |
| lang | string | | en-us | 语言设置，可选值`en-us` `zh-cn` |
| minDate | Date | | - | 最小可选日期 |
| maxDate | Date | | - | 最大可选日期 |
| format | string | | yyyy/MM/dd | 日期格式 |
| allowClear | boolean | | false | 是否允许清空日期 |
| ngModel | Date | Y | - | 当前选中日期 |
 
**Usage**
```html
<nk-date-picker [(ngModel)]="selectDate"></nk-date-picker>
<nk-date-picker [(ngModel)]="selectDate" lang="zh-cn" placeholder="Select Date"></nk-date-picker>
<nk-date-picker [(ngModel)]="selectYear" mode="year"></nk-date-picker>
<nk-date-picker [(ngModel)]="selectYear" mode="month"></nk-date-picker>
<nk-date-picker [(ngModel)]="selectYear" mode="year" [disabled]="true"></nk-date-picker>
```

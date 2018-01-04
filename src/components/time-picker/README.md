## nk-time-picker

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| disabled | boolean | | false | 禁用时间选择器 |
| placeholder | string | | | |
| ngModel | Date | Y | - | 当前选中时间 |
 
**Usage**
```html
<nk-time-picker [(ngModel)]="currentTime"></nk-time-picker>
<nk-time-picker [(ngModel)]="currentTime" placeholder="Select Time"></nk-time-picker>
<nk-time-picker [(ngModel)]="currentTime" [disabled]="true"></nk-time-picker>
```

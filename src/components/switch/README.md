# nk-switch

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| disabled | 设置是否为禁用状态 | boolean | false |
| ngModel | 指定当前是否选中 | boolean | - |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 Switch 的Label内容 |

**Usage**

```html
<nk-switch [(ngModel)]="checked">保存账户 - {{checked}}</nk-switch>
<nk-switch [(ngModel)]="checked" [disabled]="true">保存账户 - {{checked}}</nk-switch>
```

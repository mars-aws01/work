## nk-switch

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| disabled | boolean | | false | 设置是否为禁用状态 |
| ngModel | boolean | Y | - | 指定当前是否选中 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 Switch 的Label内容 |

**Usage**

```html
<nk-switch [(ngModel)]="checked">Bypass Address QAS</nk-switch>
<nk-switch [(ngModel)]="checked" [disabled]="true">Bypass Address QAS</nk-switch>
```

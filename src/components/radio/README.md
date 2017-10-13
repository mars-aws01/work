# nk-checkbox

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| value | 设置当前Radio的value | any | - |
| disabled | 设置是否为禁用状态 | boolean | false |
| ngModel | 指定当前是否选中 | boolean | false |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置Radio的Label内容 |

**Usage**

```html
<nk-radio value="男" [(ngModel)]="sex">男</nk-radio>
<nk-radio value="女" [(ngModel)]="sex">女</nk-radio>
```

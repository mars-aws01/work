# nk-checkbox

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| disabled | 设置是否为禁用状态 | boolean | false |
| ngModel | 指定当前是否选中 | boolean | false |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置Checkbox的Label内容 |

**Usage**

```html
<nk-checkbox>保存账户</nk-checkbox> // 基本用法
<nk-checkbox disabled>保存账户</nk-checkbox> // 禁用
<nk-checkbox [(ngModel)]="checked">保存账户</nk-checkbox> // 绑定值
```

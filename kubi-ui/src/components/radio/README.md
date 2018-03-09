## nk-radio

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| value | any | | - | 设置当前Radio的value |
| disabled | boolean | | false | 设置是否为禁用状态 | 
| name | string | | | 设置 `input type=radio` 的 name 属性 | 
| ngModel | any | Y | - | 指定当前选中的值 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置Radio的Label内容 |

**Usage**

```html
<nk-radio value="Male" [(ngModel)]="sex">Male</nk-radio>
<nk-radio value="Female" [(ngModel)]="sex">Female</nk-radio>
```

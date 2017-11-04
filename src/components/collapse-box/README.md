# nk-collapse-box

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| header | 设置 `collapse-box` 的Header | string | - |
| collapsed | 设置box是否是收缩状态 | boolean | false |
| disabled | 设置是否是禁用状态 | boolean | false |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置内容 |
| box-tools | 用于在标题栏右侧放置工具元素（链接或者按钮） |

**Events（Output）**

| 属性 | 说明 | 参数值类型 |
| --- | --- | --- | --- |
| collapsedChange | 收缩状态切换时触发 | boolean（收缩状态） |

**Usage**

```html
<nk-collapse-box header="Item1">
  Item1内容
  <ng-container slot="box-tools">
    <nk-button>ABCDE</nk-button>
  </ng-container>
</nk-collapse-box>
<nk-collapse-box header="Item2" [disabled]="true">
  Item2内容
</nk-collapse-box>
```

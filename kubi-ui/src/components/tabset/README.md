## nk-tabset

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| selected | string | Y | | 当前选中的TabItem名字 |
| tabsLeft | boolean | | false | 是否将选项卡Header显示在左侧 |
| headerWidth | number | | 80 | 当header在左侧时有效，header宽度 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 `nk-tab-item` |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |
| selectedChange | tabName |  |

## nk-tab-item

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| name | string | | | 设置选项卡名称，不设置，则是 `tabpane-${index}` |
| header | string | | | 设置选项卡Header |
| icon | string | | | 设置选项卡Header Icon Class |


**Usage**
```html
<nk-tabset [(selected)]="selected">
  <nk-tab-item header="Order 1">
    <p>我是第一个Tab的内容</p>
    <p>我是第一个Tab的内容</p>
    <p style="margin-bottom: 0">我是第一个Tab的内容</p>
  </nk-tab-item>
  <nk-tab-item header="Order 2">
    <p>我的第二个Tab的内容</p>
    <p>我的第二个Tab的内容</p>
    <p>我的第二个Tab的内容</p>
    <p style="margin-bottom: 0">我的第二个Tab的内容</p>
  </nk-tab-item>
</nk-tabset>
```

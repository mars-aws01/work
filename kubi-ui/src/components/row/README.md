# nk-row

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| gutter | number | | 0 | 栅格间隔 |
| type | string | | | 布局模式，可选 flex，现代浏览器下有效 |
| justify | string | | 'start' | flex 布局下的水平排列方式（start/end/center/space-around/space-between） |
| align | string | | 'top' | flex 布局下的垂直排列方式（top/middle/bottom） |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 `nk-col` |

**Usage**

```html
// 占满所有栅格
<nk-row>
  <nk-col></nk-col> // 默认栅格24
</nk-row>

// 4等分排列，通过span指定栅格个数
<nk-row>
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
</nk-row>

// 通过gutter设置栅格间的间距
<nk-row [gutter]="20">
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
  <nk-col [span]="8"></nk-col>
</nk-row>
```

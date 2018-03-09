# nk-col

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| span | number | | 24 | 栅格占据的列数 |
| offset | number | | 0 | 栅格左侧的间隔格数 |
| push | number | | 0 | 栅格向右移动格数 |
| pull | number | | 0 | 栅格向左移动格数 |
| xs | number/object (例如： {span: 4, offset: 4}) | | | <768px 响应式栅格数或者栅格属性对象 |
| sm | number/object (例如： {span: 4, offset: 4}) | | | ≥768px 响应式栅格数或者栅格属性对象 |
| md | number/object (例如： {span: 4, offset: 4}) | | | ≥992 响应式栅格数或者栅格属性对象 |
| lg | number/object (例如： {span: 4, offset: 4}) | | | ≥1200 响应式栅格数或者栅格属性对象 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置具体内容 |

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

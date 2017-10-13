# nk-button

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 设置按钮类型，可选值为 `primary`、`normal` | string | `normal` |
| icon | 设置按钮icon，宿主元素为i，推荐使用font-awesome，fa前缀也要填写 | string | - |
| disabled | 设置按钮是否被禁用 | boolean | `false` |
| width | 设置按钮宽度，默认自适应，设置方式 `width="80px"`、`[width]="80"`、`width="80%`、`[width]="'80%'"` | string/number | - |
 
**Slots（ng-content占位符）**

| 占位符名称 | 说明 |
| --- | --- |
| '' | 放置按钮具体内容 |

**Usage**

```html
<nk-button>Save Order</nk-button> // 基本按钮
<nk-button type="primary">Save Order</nk-button> // 主要按妞
<nk-button [disabled]="true">Cancel</nk-button> // 禁用按钮
<nk-button icon="fa fa-star">Send</nk-button> // 带icon的按钮
<nk-button icon="fa fa-star" width="150px">固定宽度150px</nk-button> // 自定义宽度的按钮
```

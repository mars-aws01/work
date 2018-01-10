## nk-button

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| type | string | | `normal` | 设置按钮类型，可选值为 `normal`、`primary`、`danger` |
| icon | string | | - | 设置按钮icon，宿主元素为i，推荐使用font-awesome，fa前缀也要填写 |
| disabled | boolean | | `false` | 设置按钮是否被禁用 |
| width | string/number | | - | 设置按钮宽度，默认自适应，设置方式 `width="80px"`、`[width]="80"`、`width="80%`、`[width]="'80%'"` |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置按钮具体内容 |

**Usage**

```html
<nk-button>Save Order</nk-button>
<nk-button type="primary">Save Order</nk-button>
<nk-button type="danger">Delete</nk-button>
<nk-button [disabled]="true">Cancel</nk-button>
<nk-button icon="fa fa-star">Send</nk-button>
<nk-button icon="fa fa-star" width="150px">150px width</nk-button>
```

**Original HTML**
```html
<button type="button" class="nk-button"> <!-- Class: nk-button-disabled | nk-button-primary | nk-button-danger -->
  <i class="fa fa-plus"></i>
  Add Product
</button>
```

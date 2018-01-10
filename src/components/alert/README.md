## nk-alert

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| type | string | | 'info' | 设置alert类型，可选['info', 'warning', 'danger', 'success'] |
| shown | boolean | Y | true | 是否显示ALERT |
| closable | boolean | | true | 是否可关闭（显示关闭按钮） |
| inline | boolean | | true | 是否显示在一行 |
| header | string | |  | Alert 标题 |

**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 设置Alert的主内容 |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |
| onClose | boolean | Alert组件关闭后触发（点击关闭按钮会引起组件关闭） |

**Usage**
```html
<nk-alert [header]="'Success'" type="success" (onClose)="onClose()">
  This is success alert
</nk-alert>

<nk-alert [header]="'Block Messages'" type="warning" [inline]="false">
  Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna,
  vel scelerisque nisl consectetur et.
</nk-alert>
```


**Original Html**
```html
<div class="nk-comp nk-alert alert"> <!-- Class: nk-alert-info | nk-alert-success | nk-alert-warning | nk-alert-danger -->
  <button class="alert-close close">×</button>
  <span class="alert-title">    
    <span>Custom Header</span>
  </span>
  <div>
    This is alert content.
  </div>
</div>
```

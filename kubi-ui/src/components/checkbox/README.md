## nk-checkbox

**Input**

| Name| Data Type | Two-way | Default Value | Description | 
| --- | --- | --- | --- | --- |
| value | any | | | 设置复选框的值，在置于 `checkbox-group` 时有用 |
| disabled | boolean | | false | 设置是否为禁用状态 |
| ngModel | boolean | Y | | 指定当前是否选中 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置Checkbox的Label内容 |

**Usage**

```html
<nk-checkbox>Shipped</nk-checkbox>
<nk-checkbox [disabled]="true">Shipped</nk-checkbox>
<nk-checkbox [(ngModel)]="checked">Shipped</nk-checkbox>
```

**Original HTML**
```html
<label class="nk-comp nk-checkbox"> <!-- Class: nk-checkbox-disabled | nk-checkbox-checked -->
  <span class="nk-checkbox-inner">
    <input type="checkbox">
  </span>
  <span class="nk-checkbox-content">
    Shipped
  </span>
</label>
```

## nk-select

**Inputs**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| placeholder | string | | '' | 占位提示文字 |
| disabled | boolean | | false | 设置是否为禁用状态 |
| allowSearch | boolean | | false | 允许搜索选择项 |
| ngModel | any | Y | - | 选中的值 |

<div class="hide">`| allowClear | 是否显示clear按钮 | boolean | false |`</div>

**Usage**
```html
<nk-select [(ngModel)]="selectedValue" [placeholder]="'Select Item'">
  <nk-option *ngFor="let item of selectOptions;" [value]="item" [label]="item"></nk-option>
</nk-select>
```

## nk-option

**Inputs**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| label | string | | - | 设置显示文本 |
| value | any | | - | 设置选择之后的值 |
| disabled | boolean | | false | 设置是否为禁用状态 |

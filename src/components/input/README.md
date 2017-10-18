# nk-input

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 设置复选框的值，在置于 `checkbox-group` 时有用 | any | - |
| placeholder | 文本框占位符 | string | - |
| readonly | 设置是否为只读状态 | boolean | false |
| disabled | 设置是否为禁用状态 | boolean | false |
| rows | 设置textarea高度，仅当type=textarea时生效 | number | 3 |
| ngModel | 指定当前是否选中 | boolean | - |

**Output**

| 属性 | 说明 | 参数值类型 |
| --- | --- | --- | --- |
| iconClick | 输入框按钮点击时触发 | MouseEvent |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |

**Usage**

```html
<nk-form>
  <nk-row [gutter]="20">
    <nk-col [span]="6">
      <nk-input [(ngModel)]="inputValue"></nk-input>
    </nk-col>
    <nk-col [span]="6">
      <nk-input type="password" [(ngModel)]="inputValue"></nk-input>
    </nk-col>
    <nk-col [span]="6">
      <nk-input type="textarea" [(ngModel)]="inputValue"></nk-input>
    </nk-col>
    <nk-col [span]="6">
      <nk-input [(ngModel)]="inputValue" required></nk-input>
    </nk-col>
  </nk-row>
</nk-form>
<nk-row [gutter]="20">
  <nk-col [span]="6">
    <nk-input [(ngModel)]="inputValue"></nk-input>
  </nk-col>
  <nk-col [span]="6">
    <nk-input type="text" [readonly]="true" [(ngModel)]="inputValue"></nk-input>
  </nk-col>
  <nk-col [span]="6">
    <nk-input type="textarea" [disabled]="true" [(ngModel)]="inputValue"></nk-input>
  </nk-col>
  <nk-col [span]="6">
    <nk-input [(ngModel)]="inputValue" required></nk-input>
  </nk-col>
</nk-row>
```

## nk-input

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| type | any | |- |设置复选框的值，在置于 `checkbox-group` 时有用 | 
| placeholder | string | |- |文本框占位符 | 
| readonly | boolean | |false |设置是否为只读状态 | 
| disabled | boolean | |false |设置是否为禁用状态 | 
| rows  | number | |3 |设置textarea高度，仅当type=textarea时生效| 
| icon  | string | | | 图标样式 |
| ngModel  | boolean | Y | - |指定当前是否选中| 

**Output**

| Name | Description | Data Type |
| --- | --- | --- | --- |
| iconClick | 输入框按钮点击时触发, 如果`disabled`状态下仍想使用`iconClick`，请将`enableIconClick`设置为`true` | MouseEvent |
| onBlur | 失去焦点时触发 | FocusEvent |

**Usage**

```html
<nk-input [(ngModel)]="inputValue" placeholder="placeholder" (onBlur)="onBlur($event)"></nk-input>
<nk-input [(ngModel)]="inputValue2" placeholder="placeholder"></nk-input>
<nk-input type="password" [(ngModel)]="inputValue3" [disabled]="true"></nk-input>
<nk-input type="textarea" [(ngModel)]="inputValue2" required></nk-input>
```

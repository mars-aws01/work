## nk-radio-group

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| -------- | -------- | -------- | -------- | -------- |
| disabled | boolean | | false | 设置是否为禁用状态 | 
| name     | string  | | | 设置radio-group下radio的name |
| ngModel  | any     | Y | - | 指定当前选中的值 |
 
**Slots（ng-content占位符）**

| Name | Description     |
| ---- | --------------- |
| ''   | 放置 `nk-radio` |

**Usage**

```html
<nk-radio-group [(ngModel)]="sex">
  <nk-radio *ngFor="let item of sexList" [value]="item">{{item}}</nk-radio>
</nk-radio-group>
```

```js
export class RadioGroupDemoComponent {
  public sex = 'Male';
  public sexList = ['Male', 'Female', 'Unknown'];
}
```

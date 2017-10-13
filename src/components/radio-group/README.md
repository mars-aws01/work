# nk-radio-group

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| disabled | 设置是否为禁用状态 | boolean | false |
| ngModel | 指定当前选中的值 | any | - |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 `nk-radio` |

**Usage**

```html
<nk-radio-group [(ngModel)]="sex">
  <nk-radio *ngFor="let item of sexList" [value]="item">{{item}}</nk-radio>
</nk-radio-group>
```

```js
export class RadioGroupDemoComponent implements OnInit {

  public sex = '男';
  public sexList = ['男', '女', '人妖', '保密'];
  
  ngOnInit() { }

}
```

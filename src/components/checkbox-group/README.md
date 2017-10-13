# nk-checkbox-group

**Input**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| ngModel | 指定当前选中的值 | any | - |
| disabled | 设定是否禁用复选框组 | boolean | false |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置 `nk-checkbox` |

**Usage**

```html
<nk-checkbox-group [(ngModel)]="selectedLanguages" [disabled]="false">
  <nk-checkbox *ngFor="let item of languageList" [value]="item" [disabled]="item === 'Java'">{{item}}</nk-checkbox>
</nk-checkbox-group>
```

```js
export class CheckboxGroupDemoComponent implements OnInit {

  public languageList = ['JavaScript', 'C#', 'Java', 'Go', 'Python'];
  public selectedLanguages: string[] = [];
  
  ngOnInit() { }
}
```

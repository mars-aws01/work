## nk-checkbox-group

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| ngModel | any | Y | | 指定当前选中的值 |
| disabled | boolean | | false | 设定是否禁用复选框组 |
 
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
export class CheckboxGroupDemoComponent {
  public languageList = ['JavaScript', 'C#', 'Java', 'Go', 'Python'];
  public selectedLanguages: string[] = [];
}
```

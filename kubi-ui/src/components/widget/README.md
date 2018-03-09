## nk-widget 

**Input**

| Name | Data Type | Two-way | Default Value | Description | Remark |
| --- | --- | --- | --- | --- | --- |
| header       | string  | | -      | 设置 `collapse-box` 的Header | |
| collapsed    | boolean | | false  | 设置box是否是收缩状态        | |
| defaultColor | string  | | | 设置标题栏背景色             | `过期，不再支持` |
 
**Slots（ng-content占位符）**

| Name    | Description                                  | Remark |
| ------- | -------------------------------------------- | --- |
| ''      | 放置内容                                     | |
| header  | 用于自定义Header                             | `过期，不再支持` |
| toolbar | 用于在标题栏右侧放置工具元素（链接或者按钮） | - |

**Events（Output）**

| Name | Description | Data Type |
| --- | --- | --- |
| collapsedChange | 收缩状态切换时触发 | boolean（收缩状态） |

**Usage**
```html
<nk-widget header="Shipping Information">
  <div slot="toolbar">
    <a href="javascript: void(0)">
      Link
    </a>
  </div>
  <nk-row [gutter]="12">
    <nk-col [span]="8">
      <div class="nk-inline-form-group">
        <label style="width: 60px" class="control-label">Company:</label>
        <nk-input type="text" [(ngModel)]="formInfo.Company"></nk-input>
      </div>
    </nk-col>
  </nk-row>
</nk-widget>
```

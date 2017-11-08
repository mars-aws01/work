# nk-grid

**Input**

| 属性       | 说明         | 类型       | 默认值 |
| ---------- | ------------ | ---------- | ------ |  |
| data       | 数据源       | Array<any> | []     |
| pageable   | 是否允许分页 | boolean    | false  |
| totalCount | 总数据条数   | number     | 0      |
 
**Slots（ng-content占位符）**

| Name | Description |
| ---- | ----------- |
| ''   | 放置表格列  |

# nk-grid-column

**Input**

| 属性        | 说明          | 类型          | 默认值 |
| ----------- | ------------- | ------------- | ------ |  |
| header      | 列头          | string        | ''     |
| width       | 列宽度        | number,string | 'auto' |
| sortable    | 是否允许排序  | boolean       | false  |
| class       | 内容TD的class | string        | ''     |
| headerClass | 列头的class   | string        | ''     |

**Usage**

```html
<nk-grid [data]="userList">
  <nk-grid-column header="姓名" field="Name"></nk-grid-column>
  <nk-grid-column header="性别" field="Sex"></nk-grid-column>
  <nk-grid-column header="年龄" field="Age"></nk-grid-column>
</nk-grid>
```

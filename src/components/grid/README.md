## nk-grid

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| ---------- | ------------ | ---------- | ------ |  |
| data       | Array<any> | | [] | 数据源 |
| pageable   | boolean    | | false  | 是否允许分页 |
| pageSize   | number     | | 20  | 分页大小 |
| pageSizeList | Array<number> | | [10,20,50] | pageSize候选值 |
| showPageSizeList | boolean | | true | 显示pageSize下拉框 |
| serverPaging | boolean | | false | 服务端分页 |
| totalCount | number     | | 0      | 总数据条数, 如果`serverPaging`为`true`则必须传入此值  |
| defaultSortField | string | | | 默认排序字段 |
| defaultSortOrder | string | | asc | 默认排序规则, 可选[`asc`, `desc`] |
| maxHeight | number | | | Grid最大高度，设置之后可以固定`table footer` |
 
**Slots（ng-content占位符）**

| Name | Description |
| ---- | ----------- |
| ''   | 放置表格列  |

**Event(Output)**

| Name       | Description         | Data Type       | 
| ----------| ------------ | ---------- | |
| onSorting | Sort信息变化 | object => { field: string, header: string, sort: string(`asc`/`desc`)} |
| onPaging | PageIndex变化 | object => { pageIndex: number } |
| onPageSizeChanged | pageSize变化 | object => { pageSize: number } |

## nk-grid-column

**Input**

| Name        | Description          | Data Type           | Default Value |
| ----------- | ------------- | ------------- | ------ |  |
| header      | 列头          | string        | ''     |
| width       | 列宽度        | number,string | 'auto' |
| sortable    | 是否允许排序  | boolean       | false  |
| class       | 内容TD的class | string        | ''     |
| headerClass | 列头的class   | string        | ''     |

**Usage**

```html
<nk-grid [data]="itemList" (onSorting)="onSorting($event)" (onPaging)="onPaging($event)" (onPageSizeChanged)="onPageSizeChanged($event)" [pageable]="true" [defaultSortField]="'UnitPrice'" [maxHeight]="200">
  <nk-grid-column header="Action" class="content-class" headerClass="header-class">
    <ng-template nkGridCellTemplate let-item="item">
      <a href="javascript: void(0)" class="nk-link">
        <i class="fa fa-pencil-square-o"></i>
      </a>
      <a href="javascript: void(0)" class="nk-link">
        <i class="fa fa-trash"></i>
      </a>
      <a href="javascript: void(0)" class="nk-link">
        Link
      </a>
    </ng-template>
  </nk-grid-column>
  <nk-grid-column header="Item#" field="ItemNo"></nk-grid-column>
  <nk-grid-column header="Item Description" field="Description"></nk-grid-column>
  <nk-grid-column header="Qty" field="Qty" [sortable]="true"></nk-grid-column>
  <nk-grid-column header="Unit Price" field="UnitPrice" [sortable]="true"></nk-grid-column>
  <nk-grid-column header="Ext Price" field="ExtPrice" [sortable]="true"></nk-grid-column>
  <nk-grid-column header="Shipping Charge" field="Charge" [sortable]="true"></nk-grid-column>
  <nk-grid-column header="WH" field="WH"></nk-grid-column>
  <nk-grid-column header="Margin" field="Margin"></nk-grid-column>
  <nk-grid-column header="Margin%" field="Margin_"></nk-grid-column>
  <nk-grid-column header="Weight" field="Weight" [sortable]="true"></nk-grid-column>
</nk-grid>
```

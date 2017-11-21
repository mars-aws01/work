# nk-pagination

**Input**

| Name          | Data Type | Two-way | Default Value | Description                               |
| ------------- | --------- | ------- | ------------- | ----------------------------------------- |
| totalCount    | number    |         | 0             | 总记录数                                  |
| pageSize      | number    |         | 10            | 每页显示的记录数                          |
| ngModel       | number    | Y       |               | 当前选中的页码                            |
| simpleMode    | boolean   |         | false         | 是否是简单模式，简单模式可以自定义toolbar |
| allowPageSize | boolean   |         | false         | 是否显示每页记录数下拉选择                |
| pageSizeList  | number[]  |         | [10,20,50]    | 设置每页记录数下拉的数据源                |
 
**Slots（ng-content占位符）**

| Name               | Description                                 |
| ------------------ | ------------------------------------------- |
| pagination-toolbar | 用于放置分页统计信息，如显示xxx提交，共xx条 |

**Events（Output）**

| Name             | Paramters | Description                                      |
| ---------------- | --------- | ------------------------------------------------ |
| onPageChange     | number    | 页码变更后触发，并传入当前选择的页码             |
| onPageSizeChange | number    | 每页记录数下拉选择后触发，并传入所选的每页记录数 |

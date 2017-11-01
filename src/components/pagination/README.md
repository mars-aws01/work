# nk-pagination

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| totalCount | number | | 0 | 总记录数 |
| pageSize | number | | 10 | 每页显示的记录数 |
| ngModel | number | Y | | 当前选中的页码 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |
| onPageChange | number | 页码变更后触发，并传入当前选择的页码 |

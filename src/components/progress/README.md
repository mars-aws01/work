# nk-progress

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| striped | boolean | | false | 是否显示条纹 |
| active | boolean | | false | 是否设置为激活状态（进度条纹是活动的）|
| size | string | | '' | 设置进度条尺寸，可选 ['micro', 'xs', 'sm', 'lg'] |
| maxValue | number | | 100 | 最大的刻度值 |
| type | string | | 'primary' | 进度条的类型，影响进度条颜色，可选 ['danger', 'warning', 'success', 'info', 'primary'] |
| value | number | | '' | 设置当前的进度值 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 设置进度条的内容 |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |

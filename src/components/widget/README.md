# nk-widget 

**Input**

| 属性         | 说明                         | 类型    | 默认值 |
| ------------ | ---------------------------- | ------- | ------ |  |
| header       | 设置 `collapse-box` 的Header | string  | -      |
| collapsed    | 设置box是否是收缩状态        | boolean | false  |
| defaultColor | 设置标题栏背景色             | string  |        |
 
**Slots（ng-content占位符）**

| Name    | Description                                  |
| ------- | -------------------------------------------- |
| ''      | 放置内容                                     |
| header  | 用于自定义Header                             |
| toolbar | 用于在标题栏右侧放置工具元素（链接或者按钮） |

**Events（Output）**

| 属性            | 说明               | 参数值类型          |
| --------------- | ------------------ | ------------------- |  |
| collapsedChange | 收缩状态切换时触发 | boolean（收缩状态） |



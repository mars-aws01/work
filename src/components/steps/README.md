# nk-steps

**该组件源码参考自 `element-angular`，用法也保持一致 **

**Inputs**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| space | 每个 step 的间距，不填写将自适应间距。支持百分比。如: 100px/50%  |Number,String | |
| direction | 显示方向，可选['vertical', 'horizontal'] | string | 'horizontal' | 
| active | 设置当前激活步骤，默认激活第一个是 1	| number | 0 |
| process-status | 设置当前步骤的状态，可选wait/process/finish/error/success | string | 'process' |
| finish-status | 设置结束步骤的状态，可选wait/process/finish/error/success | string | 'finish' |
| align-center | 设置描述居中对齐 | boolean | false |
| simple | 开启简单风格 | boolean | false | 
| center | 组件居中显示 | boolean | false |

# nk-step

**Inputs**

| 属性 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 标题 | string | |
| description | 描述性文字 | string | |
| icon | 图标 | string | |

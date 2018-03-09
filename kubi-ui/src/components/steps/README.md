## nk-steps

**Inputs**

| Name| Data Type | Two-way | Default Value | Description | Remark |
| --- | --- | --- | --- | --- |
| direction | string | | 'horizontal' | 显示方向，可选['vertical', 'horizontal'] | |
| active | number | | 0 | 设置当前激活步骤，默认激活第一个是 1	| |
| space | Number,String | | | 每个 step 的间距，不填写将自适应间距。支持百分比。如: 100px/50%  | `过期，不再支持` |
| process-status | string | | 'process' | 设置当前步骤的状态，可选wait/process/finish/error/success | `过期，不再支持` |
| finish-status | string | | 'finish' | 设置结束步骤的状态，可选wait/process/finish/error/success | `过期，不再支持` |
| align-center | boolean | | false | 设置描述居中对齐 | `过期，不再支持` |
| simple | boolean | | false | 开启简单风格 | `过期，不再支持` |

**Usage**
```html
<nk-steps>
  <nk-step title="Shipping Information"></nk-step>
  <nk-step title="Billing Information"></nk-step>
  <nk-step title="Order Review"></nk-step>
  <nk-step title="Confirm"></nk-step>
</nk-steps>

<nk-steps [active]="2" [direction]="'vertical'">
  <nk-step></nk-step>
  <nk-step></nk-step>
  <nk-step></nk-step>
  <nk-step title="Confirm"></nk-step>
</nk-steps>
```

## nk-step

**Inputs**

| Name| Data Type | Two-way | Default Value | Description | Remark |
| --- | --- | --- | --- | --- |
| title | string | | Step-`{index}` | 标题 | |
| description | string | | | 描述性文字 | `过期，不再支持` |
| icon | string | | | 图标 | `过期，不再支持` |

## [nk-tooltip]

| Name | Data Type | Two-way | Default Value | Description |
| -------------- | ------------------------------------------------------ | ------- | ------ |  |
| nk-tooltip     | string  | | -      | 设置要提示的文本，当allowHtml=true时，可以接受html标签 |
| placement      | string | | 'top'  | Tooltip要显示的位置，可选 ['top', 'bottom', 'left', 'right', 'auto'] |
| delay          |  number,object | | 0 | 指定显示tooltip的延迟时间                                       |
| allowHtml      | boolean | | false | 是否允许解析HTML标签 | 
| tooltipTrigger | string | | 'hover focus' | 触发tooltip的事件，可选 ['click', 'hover', 'focus', 'manual'] |
| tooltip-type | string | | normal | tooltip类型， 可选 [`error`, `normal`] |

**更详细的说明，请参考[Bootstrap Tooltips](http://v3.bootcss.com/javascript/#tooltips)**

**Usage**

```html
<nk-button [nk-tooltip]="'我是一个Tooltip提示'">点我试试</nk-button>
<nk-button [nk-tooltip]="'我是一个Tooltip提示'" [tooltip-type]="'error'">点我试试</nk-button>
```

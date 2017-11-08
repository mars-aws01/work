# [nk-tooltip]

| 属性           | 说明                                                   | 类型    | 默认值 |
| -------------- | ------------------------------------------------------ | ------- | ------ |  |
| nk-tooltip     | 设置要提示的文本，当allowHtml=true时，可以接受html标签 | string  | -      |
| placement      | Tooltip要显示的位置，可选 ['top', 'bottom', 'left', 'right', 'auto'] | string | 'top'  |
| delay          | 指定显示tooltip的延迟时间                                       | number,object | 0 |
| allowHtml      | 是否允许解析HTML标签 | boolean | false |
| tooltipTrigger | 触发tooltip的事件，可选 ['click', 'hover', 'click hover'] | string | 'click hover' |

**更详细的说明，请参考[Bootstrap Tooltips](http://v3.bootcss.com/javascript/#tooltips)**

**Usage**

```html
<nk-button [nk-tooltip]="'我是一个Tooltip提示'">点我试试</nk-button>
```

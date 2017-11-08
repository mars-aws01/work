# [nk-popover]

| 属性           | 说明                                                   | 类型    | 默认值 |
| -------------- | ------------------------------------------------------ | ------- | ------ |  |
| nk-popover     | 设置要提示的文本，当allowHtml=true时，可以接受html标签 | string  | -      |
| placement      | Popover要显示的位置，可选 ['top', 'bottom', 'left', 'right', 'auto'] | string | 'right'  |
| delay          | 指定显示popover的延迟时间                                       | number,object | 0 |
| allowHtml      | 是否允许解析HTML标签 | boolean | false |
| popoverTrigger | 触发popover的事件，可选 ['click', 'hover', 'focus', 'manual'] | string | 'click' |

**更详细的说明，请参考[Bootstrap Popovers](http://v3.bootcss.com/javascript/#popovers)**

**Usage**

```html
<nk-button [nk-popover]="'我是一个Popover提示'" title="Popover 标题">点我试试</nk-button>
<ng-template #popTemplate>
  我是文本内容
  <br>
  这里可以放大段文本。
  <br>注意，不能使用事件。
</ng-template>
<nk-button [nk-popover]="popTemplate" title="Popover 标题" placement="bottom" [allowHtml]="allowHtml">点我试试</nk-button>
```

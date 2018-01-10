## nk-modal

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| width | number | | | 设置弹出层的宽度，设置后size属性将会失效 |
| header | string | | | 设置弹出层的标题 |
| animate | string | | 'fade' | 设置弹出层的动画效果 |
| okText | string | | 'Save' | 设置确认按钮的文本 |
| cancelText | string | | 'Cancel' | 设置取消按钮的文本 |
| draggable | boolean | | false | 是否允许弹出层可以拖拽 |
| shown | boolean | Y | false | 控制弹出层的显示隐藏 |
| disableBackdrop | boolean | | false | `draggable`为`true`时生效，完全禁用遮罩，非模态框，另外需设置`options`的`backdrop`属性为`false` |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 放置内容 |
| modal-header | 自定义弹出层Header内容 |
| modal-footer | 自定义弹出层footer内容（设置后将无法触发ok和cancel事件） |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |
| onShown | Event | 弹出层显示后触发 |
| onHidden | Event | 弹出层隐藏后触发 |
| onCancel |  | 点击取消按钮时触发（会关闭弹出层）|
| onOk | | 点击确认按钮时触发（不会关闭弹出层） |

**Usage**
```html
<nk-modal [(shown)]="modalShown" header="Shipping Information">
  I'm Modal Content
</nk-modal>

<nk-modal [(shown)]="modalShown" header="Shipping Information" size="lg">
  I'm Large Modal Content
</nk-modal>

<nk-modal [(shown)]="modalShown" header="Customer Footer">
  <div slot="modal-footer">
    <nk-button (click)="onOkBtnClick()">Click</nk-button>
  </div>
</nk-modal>
```

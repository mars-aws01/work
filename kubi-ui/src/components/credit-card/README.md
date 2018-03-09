## nk-credit-card

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| placeholder | string | | Card Number  |文本框占位符 | 
| readonly | boolean | |false |设置是否为只读状态 | 
| disabled | boolean | |false |设置是否为禁用状态 | 
| invalid  | boolean | |false | 设置是否为错误卡号 | 
| customMask | string | | | 自定义mask规则 |
| ngModel  | boolean | Y | - | 当前信用卡号 | 

**Usage**

```html
<nk-credit-card [(ngModel)]="cardNumber"></nk-credit-card>
<nk-credit-card [(ngModel)]="cardNumber2" [readonly]="true"></nk-credit-card>
```

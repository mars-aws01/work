## nk-rating

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| maxNum | number | | 5 | 最大的评星个数 |
| rateClass | string | | egg | 评星的样式 |
| readOnly | boolean | | false | 只读 |
| ngModel | number | Y | | 双向绑定的值 |

**Usage**
```html
<nk-rating [(ngModel)]="ratingVal"></nk-rating>
<nk-rating [(ngModel)]="ratingVal" [readOnly]="true"></nk-rating>
<nk-rating [(ngModel)]="ratingVal" [maxNum]="10" rateClass="fa fa-heart"></nk-rating>
```

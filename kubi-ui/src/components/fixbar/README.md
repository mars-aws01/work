## nk-fixbar

**Input**

| Name| Data Type | Two-way | Default Value | Description |
| ----- | ---------------- | ------------ | ------ |  |
| items | FixbarItem[] | | - | 要显示的内容列表 |

**FixbarItem属性**

```js
{
  title: string;
  icon: string;
  fn: Function;
}
```

**Usage**

```html
<nk-fixbar [items]="fixbarItems"></nk-fixbar>
```

```js
public fixbarItems = [{
  title: 'Add Paragraph', icon: 'fa fa-plus', fn: () => {
    this.testClick()
  }
}];
public testClick() {
  alert('click fixbar');
}
```

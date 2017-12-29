## nk-carousel

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| animateType | string |  | 'slide' | 动画类型，可选['slide', 'fade'] |
| autoplay | boolean | | true | 是否自动播放 |
| interval | number | | 3000 | 每次切换间隔时间，单位毫秒，默认3000 |
 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 装载 `nk-carousel-item` |

**Events（Output）**

| Name | Paramters | Description |
| --- | --- | --- |
| change | currentIndex: number | 切换后触发，并传入当前切换到第几张 |

## nk-carousel-item

**Input**

| Name | Data Type |  Two-way | Default Value | Description |
| --- | --- | --- | --- | --- |
| imgUrl | string |  | | 图片地址 |

 
**Slots（ng-content占位符）**

| Name | Description |
| --- | --- |
| '' | 设置Item的内容 |

**Usage**
```html
<nk-carousel>
  <nk-carousel-item imgUrl="http://10.16.75.10:8001/img/demo/m3.jpg">
    <h4>Title 1</h4>
    <p>
      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id
      dolor id nibh ultricies vehicula ut id elit.
    </p>
    <br>
    <a href="javascript:void(0);" class="btn btn-info btn-sm">Read more</a>
  </nk-carousel-item>
  <nk-carousel-item imgUrl="http://10.16.75.10:8001/img/demo/m1.jpg">
    <h4>Title 2</h4>
    <p>
      Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id
      dolor id nibh ultricies vehicula ut id elit.
    </p>
    <br>
    <a href="javascript:void(0);" class="btn btn-danger btn-sm">Read more</a>
  </nk-carousel-item>
  <nk-carousel-item imgUrl="http://10.16.75.10:8001/img/demo/m2.jpg">
    <h4>A very long thumbnail title here to fill the space</h4>
  </nk-carousel-item>
</nk-carousel>
```

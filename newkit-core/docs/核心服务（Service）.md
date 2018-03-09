# 1、Newkit提供的核心服务

## negAjax

`negAjax` 用于提供对网络请求访问的封装。可以发起 `get, post, put, delete` 请求。


使用代码如下：

```js
import { NegAjax } from '@newkit/core';

export class TestComponent {
  public sendRequest() {
    this.negAjax.get(`http://10.16.75.24:3000/framework/v2/user-profile/Newkit/jh3r`)
      .then(({data}) => {
        this.userProfile = data;
      });
  }
}
```

当发起 `get, delete` 请求时，有两个参数 `get(url, options)`，第一个是要请求的地址，第二个是请求配置。

当发起 `post, put` 请求时，接收三个参数 `post(url, data, options)`，和 `get` 请求不同的是，增加了一个 `data` 参数，用于提交数据。

`options` 参数主要用于配置自定义headers。也可以设置 `hideLoading=true` 来禁用全局Loading显示，设置 `useCustomErrorHandler=true` 来禁用系统默认的请求异常处理。

```js
var reqOptions = {
  headers: {},
  hideLoading: true, // 默认false
  useCustomErrorHander: true // 默认false
};
```

**注意：为了能够拿到 `res` 和 `data`，then方法传递的值是 `{res: res, data: data}`，如果我们只需要其中之一，可以采用ES6解构的写法来提取：`({data}) => {}`**

## negMultiTab

`negMultiTab` 用于在多tab中打开新页面


使用代码如下：

```js
import { NegMultiTab } from '@newkit/core';

export class TestComponent {

  constructor(private negMultiTab:NegMultiTab) {}

  openPageWithNewTab() {
    this.negMultiTab.openPage('/system/global-configuration', null, true);
  }

  openPageWithCurrentTab() {
    this.negMultiTab.openPage('/system/global-configuration', null, false);
  }
}

this.negMultiTab.openPage(path: string, queryParams?: any, newTab: boolean = true)
this.negMultiTab.setCurrentTabName(value: any) // {'en-us':'xxx', 'zh-cn':'zzz', 'zh-tw':'xxx'}
```

## negAlert

> 为了UI风格一致推荐使用[`negMessageBox`](http://trgit2/newkit/newkit-core/blob/master/docs/%E6%A0%B8%E5%BF%83%E6%9C%8D%E5%8A%A1%EF%BC%88Service%EF%BC%89.md#negmessagebox),目前`negAlert`内部是替换为使用`negMessageBox`,如还需使用`Messenger.js`,请将`useMessenger`设置为`true`， **不排除以后会移除对`Messenger.js`的支持**

`negAlert` 对系统中常用的提示框，确认框，右下角的通知窗口进行了封装。

具体用法如下：

```js
// 简单的信息提示，默认3s关闭。签名如下：
// 其中message是提示信息，可选callback，提示框关闭后的回调函
// 可选配置参数userOpt = {showCloseButton?: boolean, allowHtml?: boolean, seconds: number, actions: {label1: string, fn1: Function}}
// useMessenger, 使用Messenger.js提供的弹框，默认不使用 （新增）
[info|success|warn|error](message: string, callback?: Function, userOpt = {}, useMessenger = false)
// 具体用法
this.negAlert.info('Info Message'); // 弹出信息提示框
this.negAlert.success('Success Message'); // 弹出成功提示框
this.negAlert.warn('Warn Message'); // 弹出警告提示框
this.negAlert.error('Error Message'); // 弹出出错提示框

// 用于弹出消息框（带确定按钮，不会自动关闭）参数和简单信息提示一致。
var ins = this.negAlert.alert('Alert Message', callback, userOPt);

// 用户弹出确认框（不会自动关闭，带遮罩）
this.negAlert.confirm('Confirm Message', okCallback, cancelCallback, userOpt);

// 以下方式将会在右下角弹出通知窗口。
// 其中callback的点击之后的回调，参数可设置 { type: string, color?: string, icon?: string, timeout: number }
this.negAlert.notify('Notify', callback, { type: 'warn' });
this.negAlert.notify('Notify', callback, { type: 'info', timeout: 3000});
this.negAlert.notify('Notify', callback, { type: 'success' });
this.negAlert.notify('Notify', callback, { title: 'Error', type: 'error' });

// 除此之外，还提供了关闭信息框的方法
this.negAlert.closeAll(); // 关闭所有
this.negAlert.close(ins); // 关闭指定的信息框
```

## negMessageBox

`negMessageBox` 对系统中常用的提示框，确认框，用于替换`NegAlert`。

具体用法如下：

```js
// 简单的信息提示，默认3s关闭。签名如下：
// 其中message是提示信息，可选callback，提示框关闭后的回调函
// 可选配置参数userOpt = {showCloseButton?: boolean, allowHtml?: boolean, seconds: number, actions: {label1: string, fn1: Function}}
[info|success|warn|error](message: string, title?: string, callback?: Function, userOpt = {})
// 具体用法
this.negMessageBox.info('Info Message'); // 弹出信息提示框
this.negMessageBox.success('Success Message'); // 弹出成功提示框
this.negMessageBox.warn('Warn Message'); // 弹出警告提示框
this.negMessageBox.error('Error Message'); // 弹出出错提示框

// 用于弹出消息框（带确定按钮，不会自动关闭）参数和简单信息提示一致。
var msgId = this.negMessageBox.alert('Alert Message', 'Title', callback, userOPt);

// 用户弹出确认框（不会自动关闭，带遮罩）
this.negMessageBox.confirm('Confirm Message', 'Title', okCallback, cancelCallback, userOpt);

// 除此之外，还提供了关闭信息框的方法
this.negMessageBox.closeAll(); // 关闭所有
this.negMessageBox.close(msgId); // 关闭指定的信息框
```

## negAuth

`negAuth` 提供了对已登录用户的信息访问。

```js
console.log(negAuth.user); // 输出用户信息
console.log(negAuth.displayName); // 输出显示名称（长名称，如： Jay.M.Hu）
console.log(negAuth.userId); // 输出用户ID（短名，如： jh3r）
console.log(negAuth.isAuthenticated()); // 是否登录
console.log(negAuth.isAuthorizedPath(path)); // 判断路由是否授权
```

同时也提供了OAuth token的访问支持，以及实现了基于Keystone的权限控制：

```js
// Get oauth token by appId
this.negAuth.getOAuthToken(100020) // 100020 is AppId
  .then(token => {
    console.log(token);
  });
```

```js
// Check user permission(provide appId and functionName)
negAuth.hasFunction('1f48a705-b734-476c-b32b-29359177c122', 'Menu_MenuMaintain1');

// Check user permission(provide appName and functionName)
negAuth.hasFunctionByAppName('AppName', 'Menu_MenuMaintain1');

// Check user permission(provide functionName)
negAuth.hasFunctionByName('Menu_MenuMaintain1');
```

## negBizLog

`negBizLog` 提供了记录操作日志的通用接口，可以用它来记录操作日志，如：xx点击了某个按钮，某个页面被打开，xx进行了xx操作等。

```js
// key是关键Key，用来定义某一个类操作
// bizData是业务数据，原样存储
// keyData可选的关键数据，会把数据进行平铺存储
// label可选标识，如 Button 名字
negBizLog.log(key: string, bizData: any, keyData?: Object, label?: string);
```

## negBreadcrumb

`negBreadcrumb` 提供了面包屑的操作。

```js
// 设置最后一个菜单项
negBreadcrumb.setLastBreadcrumb(lastBreadcrumb);
// 设置整个菜单项（尽量不使用）
negBreadcrumb.setBreadcrumbs(breadcrumbs);
```

单个菜单项属性如下：

```js
{
  'en-us': string, // 必须
  'zh-cn': string, // 可选
  'zh-tw': string, // 可选
  'url': string // 点击时的链接，可选
}
```

## negConfigService

`negConfigService` 实现了 `Config Service` 的封装，用法如下：

```js
// 通过提供 system 和 key 来获取数据。
// force 默认为 false，会先从缓存中获取数据。当为 true 时，会每次强制从服务端获取。
negConfigService.get(system: string, key: string, force?: boolean);

// 批量获取config数据，比如：['/system/config1', '/system/config2']
negConfigService.batchQuery(paths: Array<string>)
```

**注意：返回值是Promise**，使用值如下：

```js
negConfigService.get('bts', 'newkit')
  .then(data => {
    console.log(data);
  });
```

## negDfisUploader

`negDfisUploader` 提供了简单的文件上传API，用法如下：

```js
// 参数1是dfis的文件地址（上传后期望的文件地址，全地址），参数二是要上传的文件。
negDfisUploader.upload(dfisUrl, file);
```

## negEventBus

`negEventBus` 对全局事件通信进行的封装，用法如下：

```js
negEventBus.on(eventName: string, callback: Function); // 监听某个事件，执行回调
negEventBus.once(eventName: string, callback: Function); // 监听某个事件一次，执行之后会自动取消监听
negEventBus.emit(eventName: string, data: any); // 触发某个事件，并传递参数
```

**注意：如果使用on方式监听，请务必要在ngOnDestroy中对监听者进行释放**，如下：

```js
ngOnInit() {
  this.sub = this.negEventBus.on('xxx', () => {});
}
ngOnDestroy() {
  this.sub.unsubscribe();
}
```

## negGlobalConfig

`negGlobalConfig` 提供了对 `Global Configration` 的访问封装。用法如下：

```js
// 同config service类似，通过domain和key获取数据，force=true表示强制从服务端获取
negGlobalConfig.get(domain: string, key: string, force?: boolean)
  .then(data => {
    // 此处可以拿到data
  });
```
如果需要一次性获取获取同一个domain的多个key，那么可以使用如下方式：

```js
negGlobalConfig.load(domain: string, force?: boolean)
  .then(() => {
    return Promise.all([
      negGlobalConfig.get(domain, key),
      negGlobalConfig.get(domain, key2)
    ])
  })
  .then(dataArr => {
    // 依次进行获取
  });
```

## negStorage

`negStorage` 对本地存储（LocalStorage, WebStorage, Cookie） 进行了封装。能够用及简的API来使用本地存储，用法如下：

```js
// cookie相关
negStorage.cookie.get(name: string); // 获取指定name的cookie值
negStorage.cookie.set(name: string, value: string, {expires?: number, domain?: string, path?: string?, secure: string}); // 设置cookie，并可设置过期时间（单位天）
negStorage.cookie.remove(name: string); // 移除指定的cookie
negStorage.cookie.clear(); // 清除所有的cookie存储

// Memory,Local,Session相关，以下仅列举其一，其他接口都一致。注意，数据的生命周期和它本身的存储相关。
// Memory 刷新即丢失，Session页面关闭即丢失，Local永久存储（不主动清除，就一直存在）
negStorage.memory.get(name: string);
negStorage.memory.set(name: string, value: any);
negStorage.memory.remove(name: string);
negStorage.memory.clear();
```

针对`KeyName`，建议使用`<moduleName>-<pageName?>-<realKey>`命名规则，避免相互覆盖

## negTranslate

`negTranslate` 对多语言提供了支持。

```js
negTranslate.getCurrentLang(); // 同步方法，获取当前设置的语言。

negTranslate.use(lang: string); // 设置当前语言，如：negTranslate.use('en-us');

negTranslate.get(key: string | Array<string>); // 在ts中，通过一个或多个key，获取对应的多语言结果

// 用于设置多语言，moduleName表示模块名称，langObj结构如下：{‘en-us’: {key1: 'xxx'}, 'zh-cn': {key1: 'xxx'}, 'zh-tw': {key1: 'xxx'}};
negTranslate.set(moduleName: string, langObj: Object);

// 使用示例
// 设置多语言，通过在HTML中使用 `{{'nk-shell.test.key1' | translate }}` 进行访问。
negTranslate.set('nk-shell', {'en-us':{test: {key1: 'xxx'}}, 'zh-cn': {}, 'zh-tw': {}});
```

## negUserProfile

`negUserProfile` 提供了对用户设置的获取与保存，API如下：

```js
// 初始化用户设置，将用户设置整体获取到本地
var p: Promise = negUserProfile.init(userId);

// 获取指定的设置项，如果force为true，则强制从服务端获取
var p1: Promise = negUserProfile.get(key: string, force: boolean = false);

// 保存用户设置
var p2: Promise = negUserProfile.set(key: string, value: any);

// 移除指定的用户设置
var p3: Promise = negUserProfile.remove(key: string);
```

## negUtil

`negUtil` 提供一些常用的工具函数，如下：

```js
// 从数组中，移除指定项（修改原数组）
negUtil.remove(arr: Array<any>, item: any);

// 获取locaiton.search转换而成的对象。如果提供searchKey，那么将返回该key对应的值。
negUtil.getQuery(searchKey?: string);

// URL编解码
negUtil.encodeUri(uri: string); // window.encodeURI
negUtil.decodeUri(uri: string); // window.decodeURI

// 字符串编解码
negUtil.escape(text: string); //window.escape
negUtil.unescape(text: string); //window.unescape

// 移除数组元素（引用移除）
negUtil.remove(arr: Array<any>, item: any);

// 生成guid/uuid
negUtil.generateUUID(); // 生成UUID（GUID）

// 重置对象（用于保存表单后，重置到默认数据）
negUtil.resetObject(obj: object);

// 获取Angular路由QueryString参数 e.g. /users?userId=xxxx
negUtil.getRouteQueryParams();

// 获取Angular路由参数. e.g. /users/:userid
negUtil.getRouteParams();

// 获取路由数据 e.g. { path: '/home', component: HomePageComponent, data: { IsNew: true } }
negUtil.getRouteData();

// 获取路由fragment数据
negUtil.getRouteFragments();
```
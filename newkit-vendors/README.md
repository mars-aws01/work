# newkit-vendors

打包Newkit的依赖库。

# Usage

```bash
# Install deps
npm i

# Build
npm run vendor
```

## 1、Angular(angular-all)

包含 `rxjs, zone, Reflect` 以及 `angluar` 核心库。

```bash
# 打包Angular,生成 angular-all.js、angular-all.min.js
npm run vendor:angular
```

## 2、Kendo & Wijmo(kendo-wijmo)

包含 `kendo for angular` 以及 `wijmo`。

```bash
# 打包kendo和wijmo
npm run vendor:kw
```

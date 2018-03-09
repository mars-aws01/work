# newkit-core

Newegg frontend framework base on angular, provide common component, style and services.

# Dependencies

[Messenger](http://github.hubspot.com/messenger/docs/welcome/)，被 `negAlert` 所依赖，实现弹出提示。

[@ngx-translate/core](https://github.com/ngx-translate/core)，用于实现多语言。

# Develop?

```bash
# 发布到私有仓库
npm login --registry http://10.16.75.27:7001/

```

# Publish

```bash
# Build DEV
npm run dev

# Build PROD
npm run build

# Build For publish
npm run lib

```
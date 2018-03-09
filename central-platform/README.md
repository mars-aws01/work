# Central-Platform

一个用于托管Newkit模块和其他站点的平台站点。提供通用菜单管理，权限管理以及登录登出。

整个平台，包含两个部分，一个是前端展示部分：[web-front](web-front)，用于提供UI。

另一个是后端API部分：[central-platform-api](http://trgit2/newkit/central-platform-api)，提供平台用到的REST API。

# Strucure

![Strucure](http://neg-app-img/MISInternal/DocumentTool/upload_image_1490247889365_9.jpg)

# central-platform-front

Newegg backend web infrastructure, provide the runtime for all web modules base on newkit or not.

# 如何开发？

```bash
# clone project
git clone 

# install dependencies
npm i

# build vendor
npm run vendor

# build prod vendor(min)
npm run vendor:prod

# generate module declare file
npm run types -- -m nk-common

# start project
npm run dev

# start project with minify
npm run build

# lint the newkit folder
npm run lint
```


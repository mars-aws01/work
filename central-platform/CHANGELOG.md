# Change Log
All notable changes to this project will be documented in this file.

## v1.6.0 (2017.09.27)

- `ConfigService` 增加 `hideLoading` 参数（[#149](#149)）
- 项目拆分
- 构建方式拆分
- 增加紧凑模式

## v1.4.0 (2017.07.12)

- 从配置中读取title
- 增加多种登录方式，可以通过配置切换
- 从配置中读取默认多语言
- 升级依赖（Angular, Kendo, Wijmo, Build Deps）
- 在 `newkit/core` 中导出了 Kendo DataQuery 方法

## v1.3.0 (2017.06.21)

- 将kendoUI主题从default切换到bootstrap
- 修复 `nk-radio` 无法 `disalbed` 的问题（[#115](#115)）
- 修复 `negBreadcrumb` 无法正确设置导航的问题（[#114](#114)）
- 修复 `nk-modal` 无法设置 `size` 的问题（[#110](#110)）
- 切换Newkit进入时的加载动画（[#106](#106)）
- 修复无法使用响应式表单的问题（[#108](#108)）
- 全新的插件（模块）部署功能
- 暴露 `kendo-data-query` 相关API（[#109](#109)）
-

## v1.2.0 (2017.05.18)

- 提供生成UUID的工具库（[#93](#93)）
- 修复无法使用模块样式的bug（[#94](#94)）
- 增加Material Design Icons（[#95](#95)）
- PRD环境添加根菜单，需要审核权限，无权限会跳转到邮件发送（[#96](#96)）
- 在negAuth中增加权限校验和获取OAuth的方法（[#100](#100), [#101](#101)）
- 一级菜单Icon无设定ICON时，显示菜单文字首字母（[#99](#99)）
- 在模块加载时，允许设置反馈邮件的收件人（[#102](#102)）
- 修复Ckeditor资源加载不正确的bug
- 框架性能优化，依赖库升级

## v1.1.0 (2017.05.05)

- 菜单icon显示一级二级，三级不显示icon
- 可配置是否显示footer
- 优化nk-modal组件（[#85](#85)）
- 修复菜单栏显示问题（[#86](#86)）
- 优化小屏幕显示效果（[#87](#87)）
- 布局风格优化，更趋近于原始的SmartAdmin风格
- 升级Angular到4.1.0版本
- 新增四级菜单配置
- 优化datepicker组件
- 引入ckeditor三方插件，用于富文本编辑
- 修复浏览器回退导航地址异常（[#91](#91)）

**破坏性变更**

- 移除了datetime-picker组件
- 移除Kendo UI JS
- 集成Kendo UI For Angular 版本（[#89](#89)）

## v1.0.0 (2017.04.20)

- 将 `newkit` 拆分为 `central-platform` 和 `newkit-core` 两个项目，前者提供运行平台，后者提供公共组件、服务
- 优化HTML结构，使得能够很好的响应皮肤切换
- 移除modules目录
- 进入系统时，根据User Profile 设定菜单风格
- 优化模块加载错误处理
- 添加Logout页面
- 菜单收藏夹样式调整
- 去掉About页面，点击关于跳转到主页
- 页面底部显示动态版本号

## v0.2.0 (2017.03.21)

- 增加 `User Settings` 页面
- 将自定义控件的 `title` 属性统一替换为 `header` 属性（Break Changes, 因为和HTML自带title冲突，影响nk-tab-item,nk-widget,nk-accordion-item, nk-modal）
- 将自定义控件的 `iconClass` 属性统一替换为 `icon` 属性（Break Changes，影响nk-widget,）
- 基于SmartAdmin封装多种组件

## v0.1.0 (2017.03.01)

- 切换核心主题为`SmartAdmin`
- 完善多语言编写逻辑
- 提供通用表单验证
- 引入了 `Wijmo` 的控件
- 面包屑菜单支持点击
- 修复多个组件bug
- 完善服务API，并提供少部分文档
- 增加多个基于 `SmartAdmin` 的组件，详情请参阅组件文档
- 增加收藏夹功能，可以快速进入收藏的page。
- 修复 `Kendo-dialog` 与 `negAlert` 重叠的bug
- 修复 `GlobalConfiguration` 无法更新数据的bug

**破坏性变更**

- 移除服务 `negContext`, `negTracker`
- 修改服务 `negAjax` 的基础用法
- 移除主题 `Ace`，基于 `Ace` 的控件将不可用

## v0.0.3 (2017.02.05)

- 构建模块时，忽略.开头的目录
- 升级 `KendoUI for Angular2` 到RC版本
- 配合后端，实现模块发布功能
- 升级构建，自动复制模块下resources目录
- Newkit1模块，完整嵌入到Newkit2
- 其他稳定性提升，bug修复

## v0.0.2 (2017.01.10)

- 优化构建，更快
- 实现模块依赖
- 实现切换模块时，同时切换样式
- 实现多种预处理器支持
- 实现菜单动态配置数据
- 实现CSS独立打包
- KendoUI升级到最新beta版本
- Angular升级到 `2.4.1/3.4.1`

## v0.0.1 (2016.11.04)

- 基于Angular2实现第一个 `beta` 版本
- 引入了 `Kendo UI Angular2 beta` 版本
- 仅支持在 `config` 中配置菜单
- 使用 `gulp + webpack` 组合构建

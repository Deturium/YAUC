# YAUC

Yet Another UBB for CC98.


## What's this ?

这是一个 monorepo， 暂时有 ubb-core, ubb-react, site 三个 package。

这个项目旨在提供一个 UBB 核心帮助开发者将 CC98 的 UBB 转换为 html 或者 ReactNode。


其中 ubb-core 和 ubb-react 将发布在 npm 的 @cc98 scope 下


## 文档

https://yauc.netlify.com


## CC98

[CC98](https://www.cc98.org/) 是浙江大学最大的校内论坛。

由于学校政策限制内网访问。


## UBB

UBB 代码指这样格式的代码：

```
[b]I'm bold and [i]I'm italic[/i][/b]
```

这样的代码将被渲染成：

**I'm bold and _I'm italic_**


UBB 在防止 XSS 等风险的同时给予了用户丰富的能力，其表现力强于 markdown 等格式。
但是没有严格的统一标准，CC98 的 UBB 也是定(mo)制(gai)的。

我们所做的就是一个符合 CC98 论坛格式的专用 UBB 转换器。


## @cc98/ubb-core

该仓库是 YAUC 的核心，对外暴露一系列工具函数帮助用户处理 UBB。

如何使用请看文档站点 UBB-CORE 章节。


## @cc98/ubb-react

> NOTE: 该 repo 已经不维护

该仓库提供一套 React 的封装来将 UBB 转换为 ReactNode，你可以使用该仓库提供的能力很快的封装一个 UBB_React 组件来做 CC98 UBB 的解析工作。

注意：

1. 该仓库依赖 ubb-core 提供的能力
2. 你需要自行安装 peerDependencies，请使用 React 16
3. 如果你有定制需求，请自行修改对应的 Handler


## @cc98/site

该仓库作为该项目的文档站，由 `docz` 驱动，部署在 `netlify`。

提供了详细的文档说明和交互式演练场。



## Recruitment

欢迎加入 CC98 技术组。

你可以通过邮箱 contact@cc98.org 联系我们。

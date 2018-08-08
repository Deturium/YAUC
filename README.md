# YAUC

Yet Another UBB for CC98.


## What's this ?

这是一个 monorepo， 暂时有 ubb-core, ubb-react, site 三个 package。

这个项目旨在提供一个 UBB 核心帮助开发者将 CC98 的 UBB 转换为 html 或者 ReactNode。


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


## ubb-core

该仓库是解析器核心，对外暴露的核心函数为：

```ts
/**
 * 构造 UBB 文本为 T
 * @param UBBText UBB 文本
 * @param handlerHub 所有 Handler 集合
 * @param initContent 初始化上下文（配置项）
 */
function UBB<T>(UBBText: string, handlerHub: IHandlerHub<T>, initContent: IContent): T {...}
```

通过该核心，用户可以编写自定义的规则来决定解析一段 UBB。


```ts
/**
 * 将 UBB 文本构造成流
 * @param rawUBBText UBB 文本
 */
function* lex(rawUBBText: string): IterableIterator<IToken> {...}


/**
 * 将 Token 流构造成 AST
 * @param tokenFlow
 * @param parseConfig
 */
function parse(tokenIterator: IterableIterator<IToken>): RootNode {...}


/**
 * DFS 构造目标输出
 * @param root AST 根节点
 * @param handlerHub 所有的处理器集合
 * @param initContent 初始上下文状态
 */
function build<T>(root: RootNode, handlerHub: IHandlerHub<T>, initContent: IContent): T {...}
```

这3个函数分别提供以下能力：
- 原始文本分词
- 通过 Token 流构造 AST(抽象语法树)
- 通过 AST 构造目标输出

暴露这三个接口只为了方便用户自己把控流程和更好的理解 core 的结构。事实上，如果解析结果无法满足你的需求，那么我提供你直接 hack AST 的能力。


AST 的结构和 Handler 请看 site 的文档。


## ubb-react

> WARN: 该 repo 还在开发中

该仓库提供一套 React 的封装来将 UBB 转换为 ReactNode，你可以使用该仓库提供的能力很快的封装一个 UBB_React 组件来做 CC98 UBB 的解析工作。

简单起见，我们只暴露如下接口：

```ts
/**
 * 将 UBB 文本转换为一个 ReactNode
 */
function UBBReact(ubbText: string): <React.ReactNode> {...}
```


注意事项：

1. 该仓库依赖 ubb-core 提供的能力
2. 你需要自行安装 peerDependencies，请使用 React 16
3. 如果你有定制需求，请自行修改对应的 Handler


## site

> WARN: 该 repo 开发中，未部署

该仓库作为该项目的文档站，由 `docz` 驱动。

会提供更加详细的文档说明和交互式演练场。



## Recruitment

欢迎加入 CC98 技术组。

你可以通过邮箱 contact@cc98.org 联系我们。

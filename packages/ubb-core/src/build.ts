import {
  NodeType, ChildNode,
  RootNode, TextNode, TagNode,
} from './parse'

/**
 * 自定义上下文，在 DFS 时共享
 */
export interface IContent {
  [key: string]: any
}


export type IRootHandler<T> = {
  enter: (node: RootNode, content: IContent) => void
  exit: (node: RootNode, content: IContent) => void
  render: (node: RootNode, content: IContent, children: T[]) => T
}

export type ITagHandler<T> = {
  /** 是否递归处理子标签 */
  isRecursive: true
  /** 进入节点时触发 */
  enter?: (node: TagNode, content: IContent) => void
  /** 离开节点时触发 */
  exit?: (node: TagNode, content: IContent) => void
  /** 渲染该节点，返回渲染结果 */
  render: (node: TagNode, content: IContent, children: T[]) => T
} | {
  isRecursive: false
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent) => T
}

export type IGeneralTagHandler<T> = {
  isRecursive: true
  /** 匹配标签的正则 */
  match: RegExp
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent, children: T[]) => T
} | {
  isRecursive: false
  match: RegExp
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent) => T
}

export type ITextHandler<T> = {
  render: (node: TextNode, content: IContent) => T
}

/**
 * 所有节点 Handler 的集合
 */
export interface IHandlerHub<T> {
  /** 根节点 Handler */
  rootHandler: IRootHandler<T>

  /** 具名tag节点 Handler */
  specificTagHandlers: {
    [key: string]: ITagHandler<T>
  }
  /** 通配tag节点 Handler（HINT: 注意处理顺序） */
  generalTagHandlers: IGeneralTagHandler<T>[]

  /** 默认 TagHandler */
  defaultTagHandler: ITagHandler<T>

  /** 文本节点 Handler */
  textHandler: ITextHandler<T>
}

/**
 * DFS 处理一个节点（不能是根节点）
 * @param node 处理节点
 * @param handlerHub 处理函数
 * @param content 上下文
 */
export function handlerNode<T>(node: ChildNode, handlerHub: IHandlerHub<T>, content: IContent): T {
  if (node.type === NodeType.Tag) {
    // HANDLE TAG_NODE
    const tagNode = node as TagNode
    const tagName = tagNode.tagName
    let tagHandler!: ITagHandler<T>

    if (handlerHub.specificTagHandlers[tagName]) {
      tagHandler = handlerHub.specificTagHandlers[tagName]

    } else {
      // 如果具名没有则查找通配 Handler
      let match = false

      for (let generalTagHandler of handlerHub.generalTagHandlers) {
        if (generalTagHandler.match.test(tagName)) {
          tagHandler = generalTagHandler
          match = true
          break
        }
      }

      if (!match) {
        // 如果都不匹配则使用默认 Handler
        tagHandler = handlerHub.defaultTagHandler
      }
    }

    let ret: T
    // enter the node
    tagHandler.enter && tagHandler.enter(tagNode, content)

    if (tagHandler.isRecursive) {
      const children = tagNode.children.map(child => handlerNode<T>(child, handlerHub, content))
      ret = tagHandler.render(tagNode, content, children)
    } else {
      ret = tagHandler.render(tagNode, content)
    }

    // exit the node
    tagHandler.exit && tagHandler.exit(tagNode, content)

    return ret

  } else {
    // HANDLE TEXT_NODE
    return handlerHub.textHandler.render(node as TextNode, content)
  }
}

function rootDfs<T>(root: RootNode, handlerHub: IHandlerHub<T>, content: IContent):T {
  // 初始化上下文工作
  handlerHub.rootHandler.enter(root, content)

  const children = root.children.map(child => handlerNode<T>(child, handlerHub, content))
  const output = handlerHub.rootHandler.render(root, content, children)

  // 清理和收尾
  handlerHub.rootHandler.exit(root, content)
  return output
}

/**
 * DFS 构造目标输出
 * @param root AST 根节点
 * @param handlerHub
 * @param initContent
 */
export function build<T>(root: RootNode, handlerHub: IHandlerHub<T>, initContent: IContent): T {
  return rootDfs<T>(root, handlerHub, initContent)
}

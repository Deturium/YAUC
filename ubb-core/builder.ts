import {
  NodeType, INode,
  RootNode, TextNode, TagNode,
} from './parse'

/**
 * 自定义上下文，在 DFS 时共享
 */
export interface IContent {
  [key: string]: any
}


export type IRootHandler = {
  enter: (node: RootNode, content: IContent) => void
  exit: (node: RootNode, content: IContent) => void
  render: (node: RootNode, content: IContent, children: any[]) => any
}

export type ITagHandler = {
  isRecursive: true
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent, children: any[]) => any
} | {
  isRecursive: false
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent) => any
}

export type IGeneralTagHandler = {
  match: RegExp
  enter?: (node: TagNode, content: IContent) => void
  exit?: (node: TagNode, content: IContent) => void
  render: (node: TagNode, content: IContent) => any
}

export type IDefaultTagHandler = {
  render: (node: TagNode, content: IContent, children: any[]) => any
}


export type ITextHandler = ((text: string, content: IContent) => any)[]


export interface IHandlerHub {
  rootHandler: IRootHandler

  tagHandlers: {
    [key: string]: ITagHandler
  }

  generalTagHandlers: IGeneralTagHandler[]

  defaultTagHandler: IDefaultTagHandler

  textHandler: ITextHandler
}

function dfs(node: INode, handlerHub: IHandlerHub, content: IContent): any {
  switch (node.type) {
    case NodeType.Root:
      const rootNode = node as RootNode
      handlerHub.rootHandler.enter(node as RootNode, content)
      const children = rootNode.children.map(child => dfs(child, handlerHub, content))
      const root = handlerHub.rootHandler.render(rootNode, content, children)
      handlerHub.rootHandler.exit(rootNode, content)
      return root

    case NodeType.Text:
      let str = (node as TextNode).text
      const len = handlerHub.textHandler.length
      for (let i = 0; i < len; i++) {
        str = handlerHub.textHandler[i](str, content)
      }
      return str

    case NodeType.Tag:
      const tagNode = node as TagNode
      const tagName = tagNode.tagName
      let ret: any

      if (handlerHub.tagHandlers[tagName]) {
        const handler = handlerHub.tagHandlers[tagName]
        handler.enter && handler.enter(tagNode, content)

        if (handler.isRecursive) {
          const children = tagNode.children.map(child => dfs(child, handlerHub, content))
          ret = handler.render(tagNode, content, children)
        } else {
          ret = handler.render(tagNode, content)
        }

        handler.exit && handler.exit(tagNode, content)

      } else {

        // TODO: generalTagHandlers

        const children = tagNode.children.map(child => dfs(child, handlerHub, content))
        ret = handlerHub.defaultTagHandler.render(tagNode, content, children)
      }
      return ret
  }
}

/**
 * DFS 构造目标输出
 * @param root AST 根节点
 * @param handlerHub
 */
export function builder(root: RootNode, handlerHub: IHandlerHub, initContent: IContent): any {
  return dfs(root, handlerHub, initContent)
}

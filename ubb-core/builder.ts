import {
  NodeType, INode,
  RootNode, TextNode, TagNode,
} from './parse'

/**
 * 自定义上下文，在 DFS 时共享
 */
export interface IContent {
  [propName: string]: any
}

export interface IHandlerHub {
  rootHandler: {
    enter: (node: RootNode, content: IContent) => void
    exit: (node: RootNode, content: IContent) => void
    render: (node: RootNode, content: IContent, children: any[]) => any
  }

  tagHandler: {
    [propName: string]: {
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
  }

  defaultTagHandler: {
    render: (node: TagNode, content: IContent, children: any[]) => any
  }

  textHandler: ((text: string, content: IContent) => any)[]
}

function dfs(node: INode, handlerHub: IHandlerHub, content: IContent): any {
  switch (node.type) {
    case NodeType.Root:
      handlerHub.rootHandler.enter(node as RootNode, content)
      const children = (node as TagNode).children.map(child => dfs(child, handlerHub, content))
      const root = handlerHub.rootHandler.render(node as RootNode, content, children)
      handlerHub.rootHandler.exit(node as RootNode, content)
      return root

    case NodeType.Text:
      let str = (node as TextNode).text
      const len = handlerHub.textHandler.length
      for (let i = 0; i < len; i++) {
        str = handlerHub.textHandler[i](str, content)
      }
      return str

    case NodeType.Tag:
      const tagName = (node as TagNode).tagName
      let ret: any

      if (handlerHub.tagHandler[tagName]) {
        const handler = handlerHub.tagHandler[tagName]
        handler.enter && handler.enter(node as TagNode, content)

        if (handler.isRecursive) {
          const children = (node as TagNode).children.map(child => dfs(child, handlerHub, content))
          ret = handler.render(node as TagNode, content, children)
        } else {
          ret = handler.render(node as TagNode, content)
        }

        handler.exit && handler.exit(node as TagNode, content)

      } else {
        const children = (node as TagNode).children.map(child => dfs(child, handlerHub, content))
        ret = handlerHub.defaultTagHandler.render(node as TagNode, content, children)
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

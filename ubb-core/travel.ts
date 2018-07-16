import {
  NodeType, INode,
  RootNode, TextNode, TagNode,
} from './parse'

/**
 * 自定义上下文，在 travel 时共享
 */
export interface IContent {
  [propName: string]: any
}

export interface IVisitor {
  rootHandler: {
    enter: (node: RootNode, content: IContent) => void
    exit: (node: RootNode, content: IContent) => void
  }
  tagHandler: {
    enter: (node: TagNode, content: IContent) => void
    exit: (node: TagNode, content: IContent) => void
  }
  textHandler: (node: TextNode, content: IContent) => void
}

function dfs(node: INode, visitor: IVisitor, content: IContent) {
  switch (node.type) {
    case NodeType.Root:
      visitor.rootHandler.enter
        && visitor.rootHandler.enter(node as RootNode, content)
      // Recursive DFS
      ;(node as RootNode).children.forEach(n => dfs(n, visitor, content))

      visitor.rootHandler.exit
        && visitor.rootHandler.exit(node as RootNode, content)
      break

    case NodeType.Text:
      visitor.textHandler(node as TextNode, content)
      break

    case NodeType.Tag:
      visitor.tagHandler.enter
        && visitor.tagHandler.enter(node as TagNode, content)

      ;(node as TagNode).children.forEach(n => dfs(n, visitor, content))

      visitor.tagHandler.exit
        && visitor.tagHandler.exit(node as TagNode, content)
      break
  }
}

/**
 * DFS 遍历 AST
 * @param root AST 根节点
 * @param visitor
 */
export function travel(root: RootNode, visitor: IVisitor, initContent: IContent, ) {
  dfs(root, visitor, initContent)
}

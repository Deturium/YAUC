import {
  TokenType, IToken, parseTagData, ITagData
} from './lex'

export const enum NodeType {
  /** 根节点 */
  ROOT,
  /** 文本节点 */
  TEXT,
  /** 标签节点 */
  TAG,
}

export interface INode {
  type: NodeType
}

export class RootNode implements INode {
  type: NodeType = NodeType.ROOT
  children: ChildNode[] = []

  _isClose: boolean = false
}

export class TextNode implements INode {
  type: NodeType = NodeType.TEXT
  parent: ParentNode

  readonly text: string

  constructor(rawText: string, parent: ParentNode) {
    this.text = rawText
    this.parent = parent
  }
}

export class TagNode implements INode {
  type: NodeType = NodeType.TAG
  parent: ParentNode
  children: ChildNode[] = []

  tagName: string
  tagData: ITagData

  _isClose: boolean = false
  _rawText: string

  constructor(rawText: string, parent: ParentNode) {
    this._rawText = rawText
    this.parent = parent

    // parse TAG
    this.tagData = parseTagData(rawText)
    this.tagName = this.tagData.__tagName__
  }

  get innerText(): string {
    return this.children.map(n => n.text).join('')
  }

  get text(): string {
    // startTag + innerText + endTag
    return `${this._rawText}${this.innerText}${this._isClose ? `[/${this.tagName}]` : ''}`
  }
}

/**
 * 可以当做一个节点的父节点
 */
export type ParentNode = RootNode | TagNode

/**
 * 可以当做一个节点的子节点
 */
export type ChildNode = TextNode | TagNode


/**
 * 关闭一个Tag节点
 * @param node
 * @param recursive 是否递归闭合子节点
 */
function close(node: ParentNode, recursive = false) {
  node._isClose = true
  if (!recursive)
    return

  const children: ChildNode[] = []

  const flat = (child: ChildNode) => {
    // 修改 parent 的指向
    child.parent = node
    children.push(child)

    if (child.type === NodeType.TAG && (child as TagNode)._isClose === false) {
      (child as TagNode).children.forEach(flat)
    }
  }

  node.children.forEach(flat)
  node.children = children
}

/**
 * 将 Token 流构造成 AST
 * @param tokenFlow
 * @param parseConfig
 */
export function parse(tokenIterator: IterableIterator<IToken>): RootNode {
  const root = new RootNode()
  const startTagStack: TagNode[] = []

  let curNode: ParentNode = root

  for (let token of tokenIterator) {
    if (token.type === TokenType.TEXT) {
      curNode.children.push(new TextNode(token.rawText, curNode))

    } else if (token.type === TokenType.START_TAG) {
      const tagNode: TagNode = new TagNode(token.rawText, curNode)
      curNode.children.push(tagNode)
      curNode = tagNode
      startTagStack.push(tagNode)

    } else if (token.type === TokenType.END_TAG) {
      // parse EndTag
      //   e.g. [/b] --> b
      const tagName = token.rawText.slice(2, -1).toLowerCase()

      // 找到与结束标签相对应的开始标签
      let i = startTagStack.length - 1
      let match = false
      for (; i >= 0; i--) {
        if (tagName === startTagStack[i].tagName) {
          match = true
          break
        }
      }

      if (match) {
        if (i === startTagStack.length - 1) {
          close(startTagStack[i])
          startTagStack.pop()

        } else {
          // 有标签未正确关闭
          close(startTagStack[i], true)
          startTagStack.splice(i, startTagStack.length)
        }
        curNode = i === 0 ? root : startTagStack[i-1]

      } else {
        // 没有找到对应的开始标签，结束标签退化为文本标签
        curNode.children.push(new TextNode(token.rawText, curNode))
      }
    }
  }

  close(root, true)

  return root
}

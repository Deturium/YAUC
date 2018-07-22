import {
  TokenType, IToken,
} from './lex'

export const enum NodeType {
  /** 根节点 */
  Root,
  /** 文本节点 */
  Text,
  /** 标签节点 */
  Tag,
}

export interface INode {
  type: NodeType
}

export class RootNode implements INode {
  type: NodeType = NodeType.Root
  children: ChildNode[] = []
}

export class TextNode implements INode {
  type: NodeType = NodeType.Text
  parent: ParentNode

  readonly text: string

  constructor(rawText: string, parent: ParentNode) {
    this.text = rawText
    this.parent = parent
  }
}

export class TagNode implements INode {
  type: NodeType = NodeType.Tag
  parent: ParentNode
  children: ChildNode[] = []

  tagName!: string
  tagData!: string[]

  _isClose: boolean = false
  _rawText: string

  constructor(rawText: string, parent: ParentNode) {
    this._rawText = rawText
    this.parent = parent

    this._parseTag(rawText)
  }

  /**
   * parse Tag in constructor
   * @param rawText
   */
  _parseTag(rawText: string) {
    // [b] --> b
    const str = rawText.slice(1, -1)
    const indexOfEq = str.indexOf('=')

    if (indexOfEq === -1) {
      this.tagName = str.toLowerCase()
      this.tagData = []
    } else {
      // [border=1, red]
      this.tagName = str.slice(0, indexOfEq).toLowerCase()
      this.tagData = str.slice(indexOfEq+1).split(',').map(s => s.trim())
    }
  }

  // get text(): string {
  //   return [
  //     this._rawText,
  //     // ...this.children.map(n => n.text),
  //     `[/${this.tagName}]`,
  //   ].join('')
  // }
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
function close(node: TagNode, recursive = false) {
  node._isClose = true
  if (!recursive)
    return

  const children: ChildNode[] = []

  const flat = (child: ChildNode) => {
    if (child.type === NodeType.Tag && (child as TagNode)._isClose === false) {
      const tagChild = child as TagNode
      children.push(new TagNode(tagChild._rawText, node))
      tagChild.children.forEach(flat)

    } else {
      // 修改 parent 的指向
      child.parent = node
      children.push(child)
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
    if (token.type === TokenType.Text) {
      curNode.children.push(new TextNode(token.rawText, curNode))

    } else if (token.type === TokenType.StartTag) {
      const tagNode: TagNode = new TagNode(token.rawText, curNode)
      curNode.children.push(tagNode)
      curNode = tagNode
      startTagStack.push(tagNode)

    } else if (token.type === TokenType.EndTag) {
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

  return root
}

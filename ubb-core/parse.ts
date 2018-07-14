import { TokenType, IToken } from './lex'

const enum NodeType {
  /**
   * 根节点
   */
  Root,
  /**
   * 文本节点
   */
  Text,
  /**
   * 标签节点
   */
  Tag,
}

interface INode {
  type: NodeType
}

/**
 * 可以当做一个节点的父节点
 */
type ParentNode = RootNode | TagNode

/**
 * 可以当做一个节点的子节点
 */
type ChildNode = TextNode | TagNode


class RootNode implements INode {
  type: NodeType = NodeType.Root
  children: ChildNode[] = []
}

class TextNode implements INode {
  type: NodeType = NodeType.Text
  text: string

  constructor(rawText: string) {
    this.text = rawText
  }
}

class TagNode implements INode {
  type: NodeType = NodeType.Tag
  tagName!: string
  tagData!: Object

  parent: ParentNode
  children: ChildNode[] = []

  _isClose: boolean = false
  _rawText: string

  constructor(rawText: string, parent: ParentNode) {
    this._rawText = rawText
    this.parent = parent

    this._parseTag(rawText)
  }

  _parseTag(rawText: string) {
    this.tagName = rawText.slice(1, -1)
    // TODO: parse tagData
  }

  get text(): string {
    // TODO: text
    return this._rawText
  }
}

/**
 * 关闭一个Tag节点
 * @param node
 * @param recursive 是否递归闭合子节点
 */
function close(node: TagNode, recursive = false): void {
  node._isClose = true
  if (!recursive)
    return

  const children: ChildNode[] = []

  const flat = (child: ChildNode) => {
    if (child.type === NodeType.Tag && (child as TagNode)._isClose === false) {
      const tagNode = child as TagNode
      children.push(new TextNode(tagNode._rawText))
      tagNode.children.forEach(flat)

    } else {
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
export function parse(tokenFlow: IToken[]): RootNode {
  const root = new RootNode()
  const startTagStack: TagNode[] = []

  let flowCur = 0
  let curNode: ParentNode = root

  while (true) {
    const token = tokenFlow[flowCur++]
    if (!token)
      break

    if (token.type === TokenType.Text) {
      curNode.children.push(new TextNode(token.rawText))

    } else if (token.type === TokenType.StartTag) {
      const tagNode: TagNode = new TagNode(token.rawText, curNode)
      curNode.children.push(tagNode)
      curNode = tagNode
      startTagStack.push(tagNode)

    } else if (token.type === TokenType.EndTag) {
      const tagName = token.rawText.slice(2, -1)

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
        curNode.children.push(new TextNode(token.rawText))
      }
    }
  }

  return root
}

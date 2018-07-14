import { TokenType, IToken } from './lex'

interface ParseConfig {

}

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
  // tagData: {
  //   [propName: string]: string | number
  // }
  parent: ParentNode
  children: ChildNode[] = []

  _isClose: boolean = false
  _rawText: string

  constructor(rawText: string, parent: ParentNode) {
    this._rawText = rawText
    this.parent = parent

    this.parseTag(rawText)
  }

  parseTag(rawText: string) {
    this.tagName = rawText.slice(1, -1)
    // TODO: parse tagData
  }

  close() {
    this._isClose = true
  }

  forceClose() {
    const children: ChildNode[] = []

    const flatNode = (node: ChildNode) => {
      if (node.type === NodeType.Tag && (node as TagNode)._isClose === false) {
        const tagNode = node as TagNode
        children.push(new TextNode(tagNode._rawText))
        tagNode.children.forEach(flatNode)
      } else {
        children.push(node)
      }
    }

    this.children.forEach(flatNode)

    this.children = children
    this._isClose = true
  }
}


export function parse(tokenFlow: IToken[], parseConfig?: ParseConfig): RootNode {
  const root = new RootNode()
  const startTagStack: ParentNode[] = [root]

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
      for (; i > 0; i--) {
        if (tagName === (startTagStack[i] as TagNode).tagName) {
          match = true
          break
        }
      }

      if (match) {
        if (i === startTagStack.length - 1) {
          (startTagStack[i] as TagNode).close()
          curNode = startTagStack[i-1]
          startTagStack.pop()

        } else {
          // 有标签未正确关闭
          (startTagStack[i] as TagNode).forceClose()
          curNode = startTagStack[i-1]
          startTagStack.splice(i, startTagStack.length)
        }

      } else {
        // 没有找到对应的开始标签，结束标签退化为字符串
        curNode.children.push(new TextNode(token.rawText))
      }
    }
  }

  return root
}

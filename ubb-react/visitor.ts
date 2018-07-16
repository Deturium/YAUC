import {
  TextNode, TagNode, RootNode,
  IContent, IVisitor,
} from '../ubb-core'

const content: IContent = {
  cnt: 0
}

const visitor: IVisitor = {
  rootHandler: {
    enter(node: RootNode, content: IContent) {
      console.log('Root')
      content.cnt++
    },
    exit(node: RootNode, content: IContent) {
      console.log('Root', content.cnt)
    },
  },

  tagHandler: {
    enter(node: TagNode, content: IContent) {
      console.log(node.text, 'enter')
    },
    exit(node: TagNode, content: IContent) {
      console.log(node.text, 'exit')
    },
  },

  textHandler(node: TextNode, content: IContent) {
    console.log(node.text)
  },
}

import {
  lex, parse, travel,
} from '../ubb-core'

const ast = parse(
  lex('aaa[b]bbb[c]ccc[/c]b[/b]ddd')
)

travel(ast, visitor, content)

import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    return node.children.map(n => n.text)
  },
}

export default handler

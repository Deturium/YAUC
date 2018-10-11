import {
  ITextHandler,
  TextNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: ITextHandler<React.ReactNode> = {
  render(node: TextNode, content: IContent) {
    return node.text
  },
}

export default handler

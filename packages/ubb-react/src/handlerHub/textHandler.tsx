import {
  ITextHandler,
  TextNode, IContent,
} from '@cc98/ubb-core'

import React from 'react'

const handler: ITextHandler<React.ReactNode> = {
  render(node: TextNode, content: IContent) {
    return node.text
  },
}

export default handler

import {
  ITagHandler,
  TagNode, IContent,
} from 'ubb-core'

import * as React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    return node.children.map(n => n.text)
  },
}

export default handler

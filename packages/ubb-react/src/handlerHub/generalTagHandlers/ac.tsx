import {
  IGeneralTagHandler,
  TagNode, IContent,
} from 'ubb-core'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /ac\d+/,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    return ` [[acTag]] `
  },
}

export default handler

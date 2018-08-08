import {
  ITagHandler,
  TagNode, IContent,
} from 'ubb-core'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    return (
      <span style={{
          fontStyle: 'italic',
        }}>
        { children }
      </span>
    )
  },
}

export default handler

import {
  ITagHandler,
  TagNode, IContent,
} from '@cc98/ubb-core'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const style: React.CSSProperties = {
      fontStyle: 'italic',
    }

    return (
      <span style={style}>
        { children }
      </span>
    )
  },
}

export default handler

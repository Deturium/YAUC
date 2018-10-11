import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const style: React.CSSProperties = {
      textDecoration: 'line-through',
    }

    return (
      <span style={style}>
        { children }
      </span>
    )
  },
}

export default handler

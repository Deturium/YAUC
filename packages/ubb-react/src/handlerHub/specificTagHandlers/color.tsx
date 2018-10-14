import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const { color } = node.tagData

    return (
      <span className={css`
        color: ${color}
      `}>
        { children }
      </span>
    )
  },
}

export default handler

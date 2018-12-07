import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
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

import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const style = css`
  text-align: right;
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return (
      <div className={style}>
        {children}
      </div>
    )
  },
}

export default handler

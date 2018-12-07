import {
  IRootHandler, RootNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const style = css`
  white-space: pre-wrap;
  word-break: break-all;
`

const handler: IRootHandler<React.ReactNode> = {
  enter(node: RootNode, context: IContext) {},

  exit(node: RootNode, context: IContext) {},

  render(node: RootNode, context: IContext, children: React.ReactNode[]) {
    return (
      <div className={style}>
        { children }
      </div>
    )
  },
}

export default handler



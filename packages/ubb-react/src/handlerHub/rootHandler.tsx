import {
  IRootHandler, RootNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const style = css`
  white-space: pre-wrap;
  word-break: break-all;
`

const handler: IRootHandler<React.ReactNode> = {
  enter(node: RootNode, content: IContent) {},

  exit(node: RootNode, content: IContent) {},

  render(node: RootNode, content: IContent, children: React.ReactNode[]) {
    return (
      <div className={style}>
        { children }
      </div>
    )
  },
}

export default handler



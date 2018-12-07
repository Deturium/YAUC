import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const style = css`
  width: 60px;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /em\d{2}/i,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {

    const emID = node.tagData.__tagName__
      .slice(2)

    // TODO: config baseURL ?
    const url = `https://www.cc98.org/static/images/em/em${emID}.gif`

    return (
      <img
        className={style}
        src={url}
        alt={`[ em${emID} ]`}
      />
    )
  },
}

export default handler

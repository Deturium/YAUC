import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const style = css`
  width: 30px;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /tb\d{2}/i,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {

    const tbID = node.tagData.__tagName__
      .slice(2)

    // TODO: config baseURL ?
    const url = `https://www.cc98.org/static/images/tb/tb${tbID}.png`

    return (
      <img
        className={style}
        src={url}
        alt={`[ tb${tbID} ]`}
      />
    )
  },
}

export default handler

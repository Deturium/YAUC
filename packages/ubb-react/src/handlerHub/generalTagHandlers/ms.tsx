import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const style = css`
  width: 60px;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /ms\d{2}/i,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {

    const msID = node.tagData.__tagName__
      .slice(2)

    // TODO: config baseURL ?
    const url = `https://www.cc98.org/static/images/ms/ms${msID}.png`

    return (
      <img
        className={style}
        src={url}
        alt={`[ ms${msID} ]`}
      />
    )
  },
}

export default handler

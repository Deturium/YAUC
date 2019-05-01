import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

import { IMG_BASE_URL } from '../../config'

const style = css`
  width: 60px;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /ac\d{2}/i,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {

    const acID = node.tagData.__tagName__
      .slice(2)

    const url = `${IMG_BASE_URL}/ac/${acID}.png`

    return (
      <img
        className={style}
        src={url}
        alt={`[ ac${acID} ]`}
      />
    )
  },
}

export default handler

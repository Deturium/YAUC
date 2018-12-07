import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /line/,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    
    return (
      <hr />
    )
  },
}

export default handler

import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /line/,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    
    return (
      <hr />
    )
  },
}

export default handler

import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

//table相关标签说明:https://www.cc98.org/topic/4070950
const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return (
      <tr> 
        {children}
      </tr>
    )
  },
}

export default handler

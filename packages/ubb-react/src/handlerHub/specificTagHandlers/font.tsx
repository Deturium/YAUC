import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const font = node.tagData.font
    
    const style = css`
    font-family: ${font};
    ` 
    return (
      <span className={style}>
        {children}
      </span>
    )
  },
}

export default handler

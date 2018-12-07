import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'
import React from 'react'
import { css } from 'emotion'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const { size } = node.tagData
    let fontSize = parseInt(size, 10)

    // TODO: 调整计算规则
    fontSize = fontSize > 7 ? 3.5 : (fontSize / 2)
    fontSize /= 1.5

    return (
      <span className={css`
        font-size: ${fontSize}rem;
      `}>
        { children }
      </span>
    )
  },
}

export default handler

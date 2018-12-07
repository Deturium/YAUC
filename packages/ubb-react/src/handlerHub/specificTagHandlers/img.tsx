import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const style = css`
  max-width: 100%;
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    return (
      <img
        className={style}
        src={node.innerText}
      />
    )
  },
}

export default handler

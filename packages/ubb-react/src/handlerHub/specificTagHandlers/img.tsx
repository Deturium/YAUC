import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    const style: React.CSSProperties = {
      maxWidth: '100%',
    }

    return (
      <img
        src={node.innerText}
        style={style}
      />
    )
  },
}

export default handler

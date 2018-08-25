import {
  ITagHandler,
  TagNode, IContent,
} from '@cc98/ubb-core'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    const { size } = node.tagData
    let fontSize = parseInt(size, 10)

    // TODO: 调整计算规则
    fontSize = fontSize > 7 ? 3.5 : (fontSize / 2)
    fontSize /= 1.5

    const style: React.CSSProperties = {
      fontSize: `${fontSize}rem`,
    }

    return (
      <span style={style}>
        { children }
      </span>
    )
  },
}

export default handler

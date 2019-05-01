import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const style = css`
  width: 90%;
  margin-left: 5%;
  border: none;
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const innerText = node.innerText
    const { bili } = node.tagData
    const partNumber = parseInt(bili, 10) || 1

    return (
      <iframe
        className={style}
        src={`https://player.bilibili.com/player.html?aid=${innerText}&page=${partNumber}`}
        allowFullScreen
      />
    )
  },
}

export default handler

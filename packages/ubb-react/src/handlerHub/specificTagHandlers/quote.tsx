import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css, cx } from 'emotion'

const containerStyle = css`
  padding: 10px;
  background-color: #f5faff;
  border: 1px solid #cccccc;
`

const itemStyle = css`
  margin-top: 1.2em;
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  enter(node: TagNode, content: IContent) {
    if (!content.quoteRoot) {
      content.quoteRoot = node
      content.quotes = []
    }
  },

  exit(node: TagNode, content: IContent) {
    if (content.quoteRoot === node) {
      content.quoteRoot = null
      content.quotes = []
    }
  },

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    content.quotes!.push(children)

    if (content.quoteRoot !== node)
      return null

    return (
      <div className={containerStyle}>
        {content.quotes!.map((item, i) => (
          <div key={i}
            className={cx({[itemStyle]: i !== 0})}
          >
            {item}
          </div>
        ))}
      </div>
    )
  },
}

export default handler

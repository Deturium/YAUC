import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

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

  enter(node: TagNode, context: IContext) {
    if (!context.quoteRoot) {
      context.quoteRoot = node
      context.quotes = []
    }
  },

  exit(node: TagNode, context: IContext) {
    if (context.quoteRoot === node) {
      context.quoteRoot = null
      context.quotes = []
    }
  },

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    context.quotes!.push(children)

    if (context.quoteRoot !== node)
      return null

    return (
      <div className={containerStyle}>
        {context.quotes!.map((item, i) => (
          <div key={i}
            className={cx({ [itemStyle]: i !== 0 })}
          >
            {item}
          </div>
        ))}
      </div>
    )
  },
}

export default handler

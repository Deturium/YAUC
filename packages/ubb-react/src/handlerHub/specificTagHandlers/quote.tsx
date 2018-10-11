import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const containerStyle: React.CSSProperties = {
  padding: 10,
  backgroundColor: '#f5faff',
  border: '1px solid #cccccc',
}

const itemStyle: React.CSSProperties = {
  marginTop: '1.2em',
}

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
      <div style={containerStyle}>
        {content.quotes!.reverse().map((item, i) => (
          <div key={i}
            style={i === 0 ? undefined : itemStyle}
          >{item}
          </div>
        ))}
      </div>
    )
  },
}

export default handler

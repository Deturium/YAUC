import {
  IRootHandler, RootNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: IRootHandler<React.ReactNode> = {

  enter(node: RootNode, content: IContent) {

  },

  exit(node: RootNode, content: IContent) {

  },

  render(node: RootNode, content: IContent, children: React.ReactNode[]) {
    return (
      <div style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}>
        { children }
      </div>
    )
  },
}

export default handler



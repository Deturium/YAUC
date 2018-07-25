import {
  IRootHandler,
  RootNode, IContent,
} from 'ubb-core'

import * as React from 'react'

const handler: IRootHandler<React.ReactNode> = {

  enter(node: RootNode, content: IContent) {

  },

  exit(node: RootNode, content: IContent) {

  },

  render(node: RootNode, content: IContent, children: React.ReactNode[]) {
    return (
      <div style={{
        padding: '15px 20px',
        border: "2px solid #66ccff",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}>
        { children }
      </div>
    )
  },
}

export default handler



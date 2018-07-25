import {
  ITagHandler,
  TagNode, IContent,
} from 'ubb-core'

import * as React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {

    return (
      <>
      { node._isClose ? <span>
          { node._rawText }
          { children }
          { `[/${node.tagName}]` }
        </span>
        : <>
          { node._rawText }
        </>
      }
      </>
    )
  },
}

export default handler

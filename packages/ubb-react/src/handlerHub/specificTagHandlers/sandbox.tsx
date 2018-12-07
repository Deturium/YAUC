import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

import { isSafe } from './url'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { url, width, height } = node.tagData

    if (!isSafe(url) && !('sandbox' in document.createElement('iframe'))) {
      return node.text
    }

    return (
      <iframe
        sandbox="allow-scripts allow-forms allow-same-origin"
        src={url}
        className={css`
          max-width: 100%;
          width: ${width};
          height: ${height};
          border: none;
        `}
      >
        {node.innerText}
      </iframe>
    )
  },
}

export default handler

import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'
import {isSafe} from './url'
import { IContent } from '@cc98/content'
import parse from 'url-parse';
import React from 'react'
import { css } from 'emotion'

const style = css`
  max-width: 100%;
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    const url = node.tagData['url'];
    if (!isSafe(url)) {
      return node.innerText;
    }

    const width = node.tagData['width'];
    const height = node.tagData['height'];
    if (!('sandbox' in document.createElement('iframe'))) {
      return node.innerText;
    }
    return (
      <iframe sandbox="allow-scripts allow-forms allow-same-origin" src={url} style={{ border: 'none', width: width, height: height, maxWidth: '100%' }}>{node.innerText}</iframe>
    )
  },
}

export default handler

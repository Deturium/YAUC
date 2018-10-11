import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /ac\d+/,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    return ` [[acTag]] `
  },
}

export default handler

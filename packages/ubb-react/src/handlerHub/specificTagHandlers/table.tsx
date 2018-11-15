import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const style = css`
 border-collapse: collapse;
`
//table相关标签说明:https://www.cc98.org/topic/4070950
const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {
    return (
      <table className={style}> 
        {children}
      </table>
    )
  },
}

export default handler

import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

//TODO:theme?
const style = css`
 border: 1px solid rgb(0,0,0);
 `

//table相关标签说明:https://www.cc98.org/topic/4070950
const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, content: IContent, children: React.ReactNode[]) {

    let rowSpan: number = 1
    let colSpan: number = 1

    // FIXME: 
    const rawText: string = node._rawText
    const tagContent: string = rawText.slice(4, rawText.length - 1)
    const values: string[] = tagContent.split(",")

    if (values.length === 2) {
      rowSpan = parseInt(values[0])
      colSpan = parseInt(values[1])
    }

    return (
      <td className={style} rowSpan={rowSpan} colSpan={colSpan}>
        {children}
      </td>
    )
  },
}

export default handler

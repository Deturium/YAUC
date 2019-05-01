import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

/**
 * TODO: 这里是仿照V3的引用样式
 */
const style = css`
  background-color: #F5FAFF;
  border: 1px solid rgb(204,204,204);
  padding: 10px 17px;
  color: red;
  margin: 6px 0;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /needreply/,

  render(node: TagNode, context: IContext) {

    return (
      <div>
        <hr />
        <div className={style}>该内容回复后才可浏览</div>
        <hr />
      </div>
    )
  },
}

export default handler

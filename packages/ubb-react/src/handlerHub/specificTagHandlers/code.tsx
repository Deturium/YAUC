import {
  ITagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContent } from '@cc98/content'

import React from 'react'
import { css } from 'emotion'

const ol = css`
list-style: none;
counter-reset: li;
padding: 0;
font-family: Consolas, Monaco;
overflow-x: auto;
white-space: pre;
`

const li = css`
counter-increment: li;
&::before {
  content: counter(li);
  display: inline-flex;
  width: 50px;
  margin: 0 10px;
  justify-content: center;
  background-color: #ebebeb;
}
`

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, content: IContent) {
    let codes = node.innerText.split('\n');
    while (!codes[0] && codes.length > 0) codes.shift();
    while (!codes[codes.length - 1] && codes.length > 0) codes.pop();
    let element = codes.map((item, index) => {
      return <li className={li} key={index}>{item}</li>
    });
    return (<div>
      <ol className={ol}>
        {element}
      </ol>
    </div>);
  },
}

export default handler

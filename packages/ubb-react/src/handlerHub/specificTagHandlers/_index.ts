import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import align from './align'
import b from './b'
import color from './color'
import del from './del'
import i from './i'
import img from './img'
import noubb from './noubb'
import quote from './quote'
import size from './size'
import u from './u'
import url from './url'


const tagHandlers: IHandlerHub<React.ReactNode>["specificTagHandlers"] = {
  align,
  b,
  color,
  del,
  i,
  img,
  noubb,
  quote,
  size,
  u,
  url,
}

export default tagHandlers

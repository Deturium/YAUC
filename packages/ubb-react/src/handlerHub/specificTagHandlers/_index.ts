import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import align from './align'
import b from './b'
import color from './color'
import del from './del'
import i from './i'
import noubb from './noubb'
import size from './size'
import u from './u'
import url from './url'


const tagHandlers: IHandlerHub<React.ReactNode>["specificTagHandlers"] = {
  align,
  b,
  color,
  del,
  i,
  noubb,
  size,
  u,
  url,
}

export default tagHandlers

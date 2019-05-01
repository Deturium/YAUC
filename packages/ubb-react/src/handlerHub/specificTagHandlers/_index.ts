import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import align from './align'
import b from './b'
import bili from './bili'
import center from './center'
import color from './color'
import cursor from './cursor'
import del from './del'
import english from './english'
import font from './font'
import i from './i'
import img from './img'
import left from './left'
import noubb from './noubb'
import quote from './quote'
import right from './right'
import sandbox from './sandbox'
import size from './size'
import u from './u'
import url from './url'

const tagHandlers: IHandlerHub<React.ReactNode>["specificTagHandlers"] = {
  align,
  b,
  bili,
  color,
  del,
  i,
  img,
  noubb,
  quote,
  size,
  u,
  url,
  sandbox,
  center,
  cursor,
  english,
  font,
  left,
  right,
}

export default tagHandlers

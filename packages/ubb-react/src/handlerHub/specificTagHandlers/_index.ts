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
import sandbox from './sandbox'

import center from './center'
import code from './code'
import cursor from './cursor'
import english from './english'
import font from './font'
import left from './left'
import right from './right'
import table from './table'
import td from './td'
import th from './th'
import tr from './tr'

/*
 *TODO:audio,bili,glow?,md,pm,topic,upload,user,video
 */
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
  sandbox,
  center,
  code,
  cursor,
  english,
  font,
  left,
  right,
  table,
  td,
  th,
  tr,
}

export default tagHandlers

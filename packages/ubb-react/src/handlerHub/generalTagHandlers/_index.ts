import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import ac from './ac'
import em from './em'
import tb from './tb'
import mahjong from './mahjong'
import ms from './ms'

import line from './line'
import needreply from './needreply'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [
  ac,
  em,
  tb,
  mahjong,
  ms,
  line,
  needreply,
]

export default generalTagHandlers

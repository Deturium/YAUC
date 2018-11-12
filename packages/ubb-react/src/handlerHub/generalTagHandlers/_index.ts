import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import ac from './ac'
import em from './em'
import tb from './tb'
import mahjong from './mahjong'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [
  ac,
  em,
  tb,
  mahjong,
]

export default generalTagHandlers

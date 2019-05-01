import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import ac from './ac'
import line from './line'
import needreply from './needreply'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [
  ac,
  line,
  needreply,
]

export default generalTagHandlers

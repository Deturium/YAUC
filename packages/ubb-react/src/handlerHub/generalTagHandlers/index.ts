import {
  IHandlerHub,
} from 'ubb-core'

import React from 'react'

import ac from './ac'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [
  ac,
]

export default generalTagHandlers

import {
  IHandlerHub,
} from '@cc98/ubb-core'

import React from 'react'

import ac from './ac'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [
  ac,
]

export default generalTagHandlers

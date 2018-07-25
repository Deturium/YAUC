import {
  IHandlerHub,
} from 'ubb-core'

import * as  React from 'react'

import ac from './ac'

const generalTagHandlers: IHandlerHub<React.ReactNode>["generalTagHandlers"] = [

  ac,

]

export default generalTagHandlers

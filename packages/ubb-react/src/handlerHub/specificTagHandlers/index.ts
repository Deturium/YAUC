import {
  IHandlerHub,
} from 'ubb-core'

import React from 'react'

import b from './b'
import i from './i'

import noubb from './noubb'

const tagHandlers: IHandlerHub<React.ReactNode>["specificTagHandlers"] = {
  b,
  i,
  noubb
}

export default tagHandlers

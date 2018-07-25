import {
  IHandlerHub,
} from 'ubb-core'

import * as  React from 'react'

import b from './b'

const tagHandlers: IHandlerHub<React.ReactNode>["specificTagHandlers"] = {

  'b': b,

}

export default tagHandlers

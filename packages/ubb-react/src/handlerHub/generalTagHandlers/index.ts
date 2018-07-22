import {
  IHandlerHub,
} from 'ubb-core'

import ac from './ac'

const generalTagHandlers: IHandlerHub<string>["generalTagHandlers"] = [

  ac,

]

export default generalTagHandlers

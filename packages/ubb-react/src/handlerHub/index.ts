import {
  IHandlerHub,
} from 'ubb-core'

import rootHandler from './rootHandler'
import specificTagHandlers from './specificTagHandlers'
import generalTagHandlers from './generalTagHandlers'
import defaultTagHandler from './defaultTagHandler'
import textHandler from './textHandler'

import * as  React from 'react'

const handlerHub: IHandlerHub<React.ReactNode> = {
  rootHandler,

  specificTagHandlers,

  generalTagHandlers,

  defaultTagHandler,

  textHandler,
}

export default handlerHub

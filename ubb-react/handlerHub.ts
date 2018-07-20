import {
  IHandlerHub,
} from '../ubb-core'

import rootHandler from './rootHandler'
import tagHandlers from './tagHandlers'
import defaultTagHandler from './defaultTagHandler'
import generalTagHandlers from './generalTagHandlers'
import textHandler from './textHandler'

export const handlerHub: IHandlerHub<string> = {
  rootHandler,

  tagHandlers,

  generalTagHandlers,

  defaultTagHandler,

  textHandler,
}

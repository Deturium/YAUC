import {
  IHandlerHub,
} from 'ubb-core'

import b from './b'

const tagHandlers: IHandlerHub<string>["specificTagHandlers"] = {

  'b': b,

}

export default tagHandlers

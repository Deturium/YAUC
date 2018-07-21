import {
  IHandlerHub,
} from '../../../ubb-core'

import b from './b'

const tagHandlers: IHandlerHub<string>["tagHandlers"] = {

  'b': b,

}

export default tagHandlers

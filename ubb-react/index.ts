import UBB from '../ubb-core'

import handlerHub from './handlerHub'
import content from './content'

const ret = UBB(
  'aaa[b]bbb[c]cc [ac01] c[d]b[/b]ddd',
  handlerHub,
  content
)

console.log(ret)

import UBB from 'ubb-core'

import handlerHub from './src/handlerHub'
import content from './src/content'

const ret = UBB(
  'aaa[b]bbb[c]cc [ac01] c[d]b[/b]ddd',
  handlerHub,
  content
)

console.log(ret)

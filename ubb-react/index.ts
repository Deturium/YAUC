import {
  lex, parse, builder,
} from '../ubb-core'

import { handlerHub } from './handlerHub'

const ast = parse(
  lex('aaa[b]bbb[c]cc [ac01] c[d]b[/b]ddd')
)

const ret = builder(ast, handlerHub, {
  cnt: 1
})

console.log(ret)

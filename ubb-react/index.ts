import {
  lex, parse, builder,
} from '../ubb-core'

import { handlerHub } from './handlerHub'

const ast = parse(
  lex('aaa[b]bbb[c]ccc[d]b[/b]ddd')
)

const ret = builder(ast, handlerHub, {
  cnt: 1
})

console.log(ret)

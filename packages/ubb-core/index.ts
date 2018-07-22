export * from './src/lex'

export * from './src/parse'

export * from './src/build'

import { lex } from './src/lex'
import { parse } from './src/parse'
import { build, IHandlerHub, IContent } from './src/build'

/**
 * 构造 UBB 文本为 T
 * @param UBBText UBB 文本
 * @param handlerHub 所有 Handler 集合
 * @param initContent 初始化上下文（配置项）
 */
export default function UBB<T>(UBBText: string, handlerHub: IHandlerHub<T>, initContent: IContent): T {
  return build<T>(
    parse(lex(UBBText)),
    handlerHub,
    initContent
  )
}

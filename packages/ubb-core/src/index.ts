export * from './lex'

export * from './parse'

export * from './build'

import { lex } from './lex'
import { parse } from './parse'
import { build, IHandlerHub, IContent } from './build'

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

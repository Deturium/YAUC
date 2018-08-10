export const enum TokenType {
  /** 纯文本 */
  Text,
  /** 开始标签，[\w+] */
  StartTag,
  /** 结束标签，[/\w+] */
  EndTag,
}

export interface IToken {
  /** Token 类型 */
  type: TokenType
  /** Token 值 */
  rawText: string
}

/**
 * 将 UBB 文本构造成流
 * @param rawUBBText UBB 文本
 */
export function* lex(rawUBBText: string): IterableIterator<IToken> {
  const tagReg = /\[.+?]/gi
  let lastIndex = 0

  while(true) {
    const tag = tagReg.exec(rawUBBText)
    if (!tag)
      break

    if (lastIndex !== tag.index) {
      yield {
        type: TokenType.Text,
        rawText: rawUBBText.slice(lastIndex, tag.index)
      }
    }
    lastIndex = tag.index + tag[0].length

    // EndTag
    if (tag[0][1] === '/') {
      yield {
        type: TokenType.EndTag,
        rawText: tag[0]
      }

    // StartTag
    } else {
      yield {
        type: TokenType.StartTag,
        rawText: tag[0]
      }
    }
  }

  if (lastIndex !== rawUBBText.length) {
    yield {
      type: TokenType.Text,
      rawText: rawUBBText.slice(lastIndex)
    }
  }
}

// FIXME: 解析 "" '' 的转义

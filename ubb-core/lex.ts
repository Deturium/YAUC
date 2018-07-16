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

export function lex(rawUBBText: string): IToken[] {
  const retTokens: IToken[] = []

  const tagReg = /\[.+?]/gi
  let lastIndex = 0

  while(true) {
    const tag = tagReg.exec(rawUBBText)
    if (!tag)
      break

    if (lastIndex !== tag.index) {
      retTokens.push({
        type: TokenType.Text,
        rawText: rawUBBText.slice(lastIndex, tag.index)
      })
    }
    lastIndex = tag.index + tag[0].length

    // EndTag
    if (tag[0][1] === '/') {
      retTokens.push({
        type: TokenType.EndTag,
        rawText: tag[0]
      })

    // StartTag
    } else {
      retTokens.push({
        type: TokenType.StartTag,
        rawText: tag[0]
      })
    }
  }

  if (lastIndex !== rawUBBText.length) {
    retTokens.push({
      type: TokenType.Text,
      rawText: rawUBBText.slice(lastIndex)
    })
  }

  return retTokens
}

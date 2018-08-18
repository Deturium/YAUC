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

  let startIndex = 0, endIndex = 0

  let state = TokenType.Text
  let inSingleQuote = false, inDoubleQuote = false

  const len = rawUBBText.length
  while (endIndex < len) {

    switch (rawUBBText[endIndex]) {
      case '[':
        if (!inSingleQuote && !inDoubleQuote) {
          if (startIndex !== endIndex) {
            yield {
              type: state,
              rawText: rawUBBText.slice(startIndex, endIndex)
            }
          }

          // judge StartTag or EndTag
          state = rawUBBText[endIndex + 1] === '/'
            ? TokenType.StartTag
            : TokenType.EndTag
          startIndex = endIndex
        }

        break

      case ']':
        if (!inSingleQuote && !inDoubleQuote) {
          yield {
            type: state,
            rawText: rawUBBText.slice(startIndex, endIndex + 1)
          }

          state = TokenType.Text
          startIndex = endIndex + 1
        }

        break

      case '"':
        if (!inSingleQuote && state === TokenType.StartTag) {
          inDoubleQuote = !inDoubleQuote
        }

        break

      case "'":
        if (!inDoubleQuote && state === TokenType.StartTag) {
          inSingleQuote = !inSingleQuote
        }

        break

      default:
        // skip
    }

    endIndex++

  }

  // don't fotget Text in the end
  if (startIndex !== endIndex) {
    yield {
      type: TokenType.Text,
      rawText: rawUBBText.slice(startIndex, endIndex)
    }
  }
}

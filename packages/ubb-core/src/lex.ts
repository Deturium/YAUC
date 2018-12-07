export const enum TokenType {
  /** 纯文本 */
  TEXT,
  /** 开始标签 */
  START_TAG,
  /** 结束标签 */
  END_TAG,
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

  let state = TokenType.TEXT
  let inSingleQuote = false, inDoubleQuote = false

  const len = rawUBBText.length
  while (endIndex < len) {

    switch (rawUBBText[endIndex]) {
      case '[':
        if (state === TokenType.TEXT) {
          if (startIndex !== endIndex) {
            yield {
              type: TokenType.TEXT,
              rawText: rawUBBText.slice(startIndex, endIndex)
            }
          }

          // judge START_TAG or END_TAG
          state = rawUBBText[endIndex + 1] === '/'
            ? TokenType.END_TAG
            : TokenType.START_TAG
          startIndex = endIndex
        }

        break

      case ']':
        if (!inSingleQuote && !inDoubleQuote && state !== TokenType.TEXT) {
          yield {
            type: state,
            rawText: rawUBBText.slice(startIndex, endIndex + 1)
          }

          state = TokenType.TEXT
          startIndex = endIndex + 1
        }

        break

      case '"':
        if (!inSingleQuote && state === TokenType.START_TAG) {
          inDoubleQuote = !inDoubleQuote
        }

        break

      case "'":
        if (!inDoubleQuote && state === TokenType.START_TAG) {
          inSingleQuote = !inSingleQuote
        }

        break

      default:
      // skip
    }

    endIndex++

  }

  // don't froget TEXT in the end
  if (startIndex !== endIndex) {
    yield {
      type: TokenType.TEXT,
      rawText: rawUBBText.slice(startIndex, endIndex)
    }
  }
}


export interface ITagData {
  __tagName__: string
  [key: string]: string
}

const enum ParseState {
  KEY,
  VALUE,
}

/**
 * 解析 TagData
 * @param rawText tagText like "[b, attr=xxx]"
 */
export function parseTagData(rawText: string): ITagData {

  const tagData: ITagData = {
    __tagName__: ''
  }
  let key: string = ''
  let value: string = ''

  let startIndex =  1
  let endIndex = 1
  const len = rawText.length - 1

  // state variable
  let parseState = ParseState.KEY
  let isFirstKey = true

  const parseKey = () => {
    while (endIndex < len) {
      if (rawText[endIndex] === '=' || rawText[endIndex] === ',')
        break
      endIndex++
    }

    return rawText.slice(startIndex, endIndex).trim()
  }

  const parseValue = () => {
    while (endIndex < len && rawText[endIndex] === ' ') {
      startIndex++
      endIndex++
    }

    const startQuote = rawText[endIndex]

    if (startQuote !== '"' && startQuote !== "'") {
      while (endIndex < len) {
        if (rawText[endIndex] === ',')
          break
        endIndex++
      }

      return rawText.slice(startIndex, endIndex).trim()
    }

    let index = startIndex + 1
    do {
      index = rawText.indexOf(startQuote, index)
      // handle case "xxx""xxx"
      if (index === -1 || rawText[index + 1] !== startQuote) {
        break
      }

      index += 2
    } while(1)

    // quote miss match
    endIndex = index === -1
      ? rawText.length - 1
      : index + 1

    if (index === -1) {
      return rawText.slice(startIndex, endIndex).trim()
    } else {
      return rawText.slice(startIndex + 1, endIndex - 1)
        .replace(startQuote + startQuote, startQuote) // "xxx""xxx" => xxx"xxx
    }
  }

  while (endIndex < len) {

    if (parseState === ParseState.KEY) {
      key = parseKey()
    } else {
      value = parseValue()
    }

    if (isFirstKey) {
      tagData["__tagName__"] = key
      isFirstKey = false
    }

    if (endIndex >= len) {
      break
    }

    startIndex = endIndex + 1

    switch (rawText[endIndex]) {
      case ',':
        if (key) {
          tagData[key] = parseState === ParseState.KEY
            ? ''
            : value
        }
        parseState = ParseState.KEY
        endIndex++
        break

      case '=':
        parseState = ParseState.VALUE
        endIndex++
        break

      default:
        parseState = ParseState.KEY
        startIndex--
    }
  }

  if (key) {
    tagData[key] = parseState === ParseState.KEY
      ? ''
      : value
  }

  return tagData
}

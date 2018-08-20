import { lex, TokenType, IToken } from '../lex'

// IToken construtors
function StartTagToken(rawText: string) {
  return {
    type: TokenType.START_TAG,
    rawText
  }
}

function TextToken(rawText: string) {
  return {
    type: TokenType.TEXT,
    rawText
  }
}

function EndTagToken(rawText: string) {
  return {
    type: TokenType.END_TAG,
    rawText
  }
}

// help function
function check(UBBText: string, expectTokens: IToken[]) {
  const iterTokens = lex(UBBText)
  let i = 0

  for (let token of iterTokens) {
    expect(token).toEqual(expectTokens[i++])
  }

  expect(i).toBe(expectTokens.length)
}


// __TEST__
describe('Basic TEST', () => {

  it('basic 1', () => {
    check(

      "[b]xxx[/b]",

      [
        StartTagToken('[b]'),
        TextToken('xxx'),
        EndTagToken('[/b]'),
      ]
    )
  })

  it('Text with space', () => {
    check(

      "[b]  xxx [/b]",

      [
        StartTagToken('[b]'),
        TextToken('  xxx '),
        EndTagToken('[/b]'),
      ]
    )
  })


  it('not start or end with Tag', () => {
    check(

      " I think... [b]xxx[/b] emmm  ",

      [
        TextToken(' I think... '),
        StartTagToken('[b]'),
        TextToken('xxx'),
        EndTagToken('[/b]'),
        TextToken(' emmm  '),
      ]
    )
  })

})


describe('Special case TEST', () => {

  it('case 1', () => {
    check(

      "[b xxx[/b]",

      [
        StartTagToken('[b xxx[/b]'),
      ]
    )
  })

  it('StartTag not close', () => {
    check(

      "xxx[tag_not_close",

      [
        TextToken('xxx'),
        TextToken('[tag_not_close'),
      ]
    )
  })

  it('] without [', () => {
    check(

      "xxx]ccc]vvv",

      [
        TextToken('xxx]ccc]vvv'),
      ]
    )
  })

})


describe('Escape TEST', () => {

  it('basic " and \' Escape', () => {
    check(

      `[t, attr="[err]", attr='[err]']xxxx[/t]`,

      [
        StartTagToken(`[t, attr="[err]", attr='[err]']`),
        TextToken('xxxx'),
        EndTagToken('[/t]'),
      ]
    )
  })

  it('basic \' Escape', () => {
    check(

      `[t, attr='[err]']xxxx[/t]`,

      [
        StartTagToken(`[t, attr='[err]']`),
        TextToken('xxxx'),
        EndTagToken('[/t]'),
      ]
    )
  })

  it('" include \'', () => {
    check(

      `[t, attr="'[err]", attr='"[]']xxxx`,

      [
        StartTagToken(`[t, attr="'[err]", attr='"[]']`),
        TextToken('xxxx'),
      ]
    )
  })


  it('" not close', () => {
    check(

      `[t, attr="'[err]]xxxx`,

      [
        TextToken(`[t, attr="'[err]]xxxx`),
      ]
    )
  })

})

import { parseTagData } from '../lex'


// __TEST__
describe('Basic TEST', () => {

  it('empty', () => {
    expect(
      parseTagData('[]')
    )
    .toEqual(
      {
        __tagName__: "",
      }
    )
  })

  it('no attr', () => {
    expect(
      parseTagData('[b]')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: '',
      }
    )
  })

  it('simple attr', () => {
    expect(
      parseTagData('[b, attr=123, attr2=456]')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: '',
        attr: '123',
        attr2: '456',
      }
    )
  })

  it('simple attr with no value', () => {
    expect(
      parseTagData('[b, attr=123, attr2]')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: '',
        attr: '123',
        attr2: '',
      }
    )
  })

  it('with space', () => {
    expect(
      parseTagData('[ b=0,attr =123 ,  attr2 = 456 ]')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: '0',
        attr: '123',
        attr2: '456',
      }
    )
  })

  it('trailing comma', () => {
    expect(
      parseTagData('[ xx = 0, c = 123, ,]')
    )
    .toEqual(
      {
        __tagName__: "xx",
        xx: '0',
        c: '123',
      }
    )
  })

})


describe('Escape TEST', () => {

  it('trim "', () => {
    expect(
      parseTagData('[b="here you"')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: "here you",
      }
    )
  })

  it('escape ,', () => {
    expect(
      parseTagData('[b, attr="here, you", attr2=123]')
    )
    .toEqual(
      {
        __tagName__: "b",
        b: '',
        attr: "here, you",
        attr2: "123"
      }
    )
  })

  it("escape ''", () => {
    expect(
      parseTagData(`[attr='here''you']`)
    )
    .toEqual(
      {
        __tagName__: "attr",
        attr: `here'you`
      }
    )
  })

  it("quote not match", () => {
    expect(
      parseTagData(`[attr='hereyou , attr2]`)
    )
    .toEqual(
      {
        __tagName__: "attr",
        attr: `'hereyou , attr2`
      }
    )
  })

})

import main from '../index'

import * as React from 'react'
import expect from 'expect'
//@ts-ignore there's no types for it
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

describe('ubb-react test', () => {
  it('should return raw text', () => {
    const result = main('test')

    expect(result).toContain('test')
  })
})
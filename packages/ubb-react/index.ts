import UBB from 'ubb-core'
import React from 'react'

import handlerHub from './src/handlerHub'
import content from './src/content'

export default function UBBReact(ubbText: string) {
  return UBB<React.ReactNode>(ubbText, handlerHub, content)
}

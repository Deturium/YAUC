import React from 'react'
import UBB from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import content from './content'

export default function UBBReact(ubbText: string) {
  return UBB<React.ReactNode>(ubbText, handlerHub, content)
}

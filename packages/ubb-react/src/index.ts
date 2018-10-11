import React from 'react'
import UBB from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import { IContent } from '@cc98/content'

const initContent: IContent = {
  // empty
}

export default function UBBReact(ubbText: string) {
  return UBB<React.ReactNode>(ubbText, handlerHub, initContent)
}

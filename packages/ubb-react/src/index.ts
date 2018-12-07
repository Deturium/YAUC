import React from 'react'
import UBB from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import { IContent } from '@cc98/content'

const defaultContent: IContent = {
  theme: {
    // TODO:
  }
}

export default function UBBReact(ubbText: string, options?: Partial<IContent>) {
  return UBB<React.ReactNode>(
    ubbText,
    handlerHub,
    {
      ...defaultContent,
      ...options,
    }
  )
}

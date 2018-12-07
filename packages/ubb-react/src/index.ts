import React from 'react'
import UBB from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import { IContext } from '@cc98/context'

const defaultContext: IContext = {
  theme: {
    // TODO:
  }
}

export default function UBBReact(ubbText: string, options?: Partial<IContext>) {
  return UBB<React.ReactNode>(
    ubbText,
    handlerHub,
    {
      ...defaultContext,
      ...options,
    }
  )
}

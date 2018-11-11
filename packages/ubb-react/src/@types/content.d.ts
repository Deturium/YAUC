declare module '@cc98/content' {

  import React, { ReactNode } from 'react'
  import {
    TagNode,
    IContent as ICoreContent,
  } from '@cc98/ubb-core'

  export interface IContent extends ICoreContent {
    theme: {
      // TODO:
    },
    /**
     * 最外层的 [quote]
     */
    quoteRoot?: TagNode | null,
    /**
     * 嵌套引用列表
     */
    quotes?: React.ReactNode[],
  }
}

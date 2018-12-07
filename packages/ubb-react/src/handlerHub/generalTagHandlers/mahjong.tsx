import {
  IGeneralTagHandler, TagNode,
} from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'
import { css } from 'emotion'

const style = css`
  width: 32px;
`

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /[acf]:/i,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {

    const tagName = node.tagData.__tagName__
    const mahjongType = tagName[0]
    const mahjongID = tagName.slice(2)


    // TODO: config baseURL ?
    let url = ""
    switch (mahjongType) {
      case "a": url = getAnimalUrl(mahjongID); break
      case "c": url = getCartoonUrl(mahjongID); break
      case "f": url = getFaceUrl(mahjongID); break
    }

    return (
      <img
        className={style}
        src={url}
        alt={tagName}
      />
    )
  },
}

function getAnimalUrl(mahjongId: string) {
  return `https://www.cc98.org/static/images/mahjong/animal2017/${mahjongId}.png`
}

function getCartoonUrl(mahjongId: string) {
  switch (mahjongId) {
    case "018":
    case "049":
    case "096":
      return `https://www.cc98.org/static/images/mahjong/carton2017/${mahjongId}.gif`;
    default:
      return `https://www.cc98.org/static/images/mahjong/carton2017/${mahjongId}.png`
  }
}

function getFaceUrl(mahjongId: string) {
  switch (mahjongId) {
    case "004":
    case "009":
    case "056":
    case "061":
    case "062":
    case "087":
    case "115":
    case "120":
    case "137":
    case "168":
    case "169":
    case "175":
    case "206":
      return `https://www.cc98.org/static/images/mahjong/face2017/${mahjongId}.gif`
    default:
      return `https://www.cc98.org/static/images/mahjong/face2017/${mahjongId}.png`
  }
}

export default handler

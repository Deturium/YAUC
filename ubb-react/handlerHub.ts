import {
  TagNode, RootNode,
  IContent, IHandlerHub,
} from '../ubb-core'

export const handlerHub: IHandlerHub = {
  rootHandler: {
    enter() {
      console.log('RS')
    },
    exit() {
      console.log('RE')
    },
    render(node: RootNode, content: IContent, children: any[]) {
      return `[ROOT]${children.join('')}[/ROOT]`
    },
  },

  tagHandlers: {
    'b': {
      isRecursive: true,
      enter() {
        console.log('BS')
      },
      exit() {
        console.log('BE')
      },
      render(node: RootNode, content: IContent, children: any[]) {
        return `[B]${children.join('')}[/B]`
      },
    }
  },

  generalTagHandlers: [

  ],

  defaultTagHandler: {
    render(node: TagNode, content: IContent, children: any[]) {
      return `[?]${children.join('')}[/?]`
    },
  },

  textHandler: [
    (text: string, content: IContent) => text
  ]
}

import {
  IGeneralTagHandler,
  TagNode, IContent,
} from 'ubb-core'

const handler: IGeneralTagHandler<string> = {
  isRecursive: true,

  match: /ac/,

  render(node: TagNode, content: IContent, children: any[]) {
    return ` [acTag] `
  },
}

export default handler

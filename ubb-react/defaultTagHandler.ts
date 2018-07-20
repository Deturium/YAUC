import {
  ITagHandler,
  TagNode, IContent,
} from '../ubb-core'

const handler: ITagHandler<string> = {
  isRecursive: true,
  render(node: TagNode, content: IContent, children: any[]) {
    return `[?]${children.join('')}[/?]`
  },
}

export default handler

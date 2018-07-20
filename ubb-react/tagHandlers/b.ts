import {
  ITagHandler,
  TagNode, IContent,
} from '../../ubb-core'

const handler: ITagHandler<string> = {
  isRecursive: true,
  enter(node: TagNode, content: IContent) {
    console.log('BS')
  },
  exit(node: TagNode, content: IContent) {
    console.log('BE')
  },
  render(node: TagNode, content: IContent, children: any[]) {
    return `[B]${children.join('')}[/B]`
  },
}

export default handler

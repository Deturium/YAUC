import {
  IRootHandler,
  RootNode, IContent,
} from '../../ubb-core'

const handler: IRootHandler<string> = {
  enter(node: RootNode, content: IContent) {
    console.log('RS')
  },

  exit(node: RootNode, content: IContent) {
    console.log('RE')
  },

  render(node: RootNode, content: IContent, children: any[]) {
    return `[ROOT]${children.join('')}[/ROOT]`
  },
}

export default handler



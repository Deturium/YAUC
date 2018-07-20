import {
  ITextHandler,
  TextNode, IContent,
} from '../ubb-core'

const handler: ITextHandler<string> = {

  render(node: TextNode, content: IContent) {
    return `${node.text}`
  },
}

export default handler



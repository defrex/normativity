import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdownContent)

  return file.toString()
}

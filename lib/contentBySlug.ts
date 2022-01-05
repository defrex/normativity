import { readFile } from 'fs/promises'
import { dirname, join } from 'path'

const contentDir = join(process.cwd(), 'content')

export async function contentBySlug(slug: string[]) {
  const trimSlug = slug.join('/').replace(/\.md$/, '')
  const fullPath = join(contentDir, `${trimSlug}.md`)
  const content = await readFile(fullPath, 'utf8')
  // const content = await import(`../content/${trimSlug}.md`)

  return content
}

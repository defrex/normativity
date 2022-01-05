import { readFile } from 'fs/promises'
import { join } from 'path'

const contentDir = join(process.cwd(), 'content')

export async function contentBySlug(slug: string[]) {
  const trimSlug = slug.join('/').replace(/\.md$/, '')
  const fullPath = join(contentDir, `${trimSlug}.md`)
  const content = await readFile(fullPath, 'utf8')
  return content
}

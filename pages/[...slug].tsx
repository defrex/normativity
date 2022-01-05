import { readdirSync } from 'fs'
import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { join } from 'path'
import { Container } from '../components/Container'
import { Html } from '../components/Html'
import { Inset } from '../components/Inset'
import { contentBySlug } from '../lib/contentBySlug'
import { markdownToHtml } from '../lib/markdownToHtml'
import { spacing } from '../lib/spacing'

interface IndexProps {
  html: string
}

export default function Index({ html }: IndexProps) {
  return (
    <div>
      <Head>
        <title>Normativity</title>
      </Head>

      <Inset spacing={spacing.xlarge}>
        <Container>
          <Html html={html} />
        </Container>
      </Inset>
    </div>
  )
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{
  slug: string[]
}>) {
  if (!params?.slug) {
    throw new Error('no slug')
  }
  const content = await contentBySlug(params.slug)

  const html = await markdownToHtml(content)
  return { props: { html } }
}

export async function getStaticPaths() {
  return {
    paths: readdirSync(join(process.cwd(), 'content')).map((slug) => ({
      params: { slug: slug.replace(/\.md$/, '').split('/') },
    })),
    fallback: false,
  }
}

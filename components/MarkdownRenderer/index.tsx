import { Content } from 'mdast'
import { ElementType, ReactNode } from 'react'
import { Root } from 'remark-parse/lib'
import { Text } from '../Text'

function Identity({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function Heading({
  children,
  depth = 2,
}: {
  children: ReactNode
  depth: number
}) {
  const Heading = `h${depth}` as ElementType
  return <Heading>{children}</Heading>
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

function TextNode({ value }: { value: string }) {
  return <Text value={value} />
}

function Emphasis({ children }: { children: ReactNode }) {
  return <em>{children}</em>
}

function getComponent(node: Root | Content): Function {
  switch (node.type) {
    case 'root':
      return Identity

    case 'paragraph':
      return Paragraph

    case 'emphasis':
      return Emphasis

    case 'heading':
      return Heading

    case 'text':
      return TextNode

    /* Handle all types here … */

    default:
      console.log('Unhandled node type', node)
      return Identity
  }
}

function Node(node: Root | Content) {
  const Component = getComponent(node)
  const { children } = node as any

  return children ? (
    <Component {...node}>
      {children.map((child: Content, index: number) => (
        <Node key={index} {...child} />
      ))}
    </Component>
  ) : (
    <Component {...node} />
  )
}

interface MarkdownRendererProps {
  ast: Root
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
  console.log('Rendering MarkdownRenderer', props.ast)
  return <Node {...props.ast} />
}

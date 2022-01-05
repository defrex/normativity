import classnames from 'classnames'
import { Children, ReactNode, useMemo } from 'react'
import { ConditionalSpacing } from '../../lib/screens'
import { Spacing, spacing as spacingValues } from '../../lib/spacing'
import styles from './styles.module.scss'

interface StackProps {
  children: ReactNode
  spacing?: Spacing | ConditionalSpacing
  className?: string
  debug?: boolean
}

export function Stack({
  children,
  spacing = spacingValues.medium,
  className,
  debug,
}: StackProps) {
  const realChildren = useMemo(
    () => Children.toArray(children).filter((child) => !!child),
    [children],
  )
  return (
    <div className={className}>
      {realChildren.map((child, index) =>
        realChildren.length - 1 === index ? (
          <div key={index}>{child}</div>
        ) : (
          <div
            key={index}
            className={classnames(
              typeof spacing === 'string'
                ? styles[`stack-${spacing}${debug ? '-debug' : ''}`]
                : Object.entries(spacing).map(
                    ([key, value]) =>
                      styles[`stack-${value}${debug ? '-debug' : ''}-${key}`],
                  ),
            )}
          >
            {child}
          </div>
        ),
      )}
    </div>
  )
}

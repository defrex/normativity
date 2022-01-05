import classnames from 'classnames'
import { Children, ReactNode, useCallback, useMemo } from 'react'
import { Spacing, spacing as spacingValues } from '../../lib/spacing'
import styles from './styles.module.scss'

export type HorizontalAlignment = 'left' | 'center' | 'right'
export type VerticalAlignment = 'bottom' | 'center' | 'top'

interface InlineProps {
  align?: HorizontalAlignment
  children: ReactNode
  className?: string
  debug?: boolean
  expand?: number | 'all'
  fill?: boolean
  shrink?: number | 'all'
  spacing?: Spacing // | ConditionalSpacing
  verticalAlign?: VerticalAlignment
  // verticalIf?: ScreenConditions & { reverse?: boolean }
}

export function Inline({
  align = 'left',
  children,
  className,
  debug,
  expand,
  fill = false,
  shrink,
  spacing = spacingValues.medium,
  verticalAlign = 'center',
}: // verticalIf,
InlineProps) {
  const realChildren = useMemo(
    () => Children.toArray(children).filter((child) => child !== null),
    [children],
  )

  const childClassName = useCallback(
    (index) => {
      return classnames(
        index + 1 < realChildren.length
          ? typeof spacing === 'string'
            ? styles[`inline-item-${spacing}${debug ? '-debug' : ''}`]
            : Object.entries(spacing).map(
                ([key, value]) =>
                  styles[`inline-item-${value}${debug ? '-debug' : ''}-${key}`],
              )
          : null,
        expand === 'all' || expand === index ? styles['expanded-item'] : null,
        shrink === 'all' || shrink === index ? styles['shrunk-item'] : null,
        // styles[
        //   classNameForScreenConditions(
        //     verticalIf?.reverse ? 'vertical-item-reverse' : 'vertical-item',
        //     verticalIf,
        //   )
        // ],
      )
    },
    [realChildren, spacing, debug, expand, shrink],
  )

  return (
    <div
      className={classnames(
        styles['inline-container'],
        fill ? styles.fill : null,
        align === 'center' ? styles.center : null,
        align === 'right' ? styles.right : null,
        verticalAlign === 'top' ? styles.top : null,
        verticalAlign === 'bottom' ? styles.bottom : null,
        // styles[
        //   classNameForScreenConditions(
        //     verticalIf?.reverse ? 'vertical-reverse' : 'vertical',
        //     verticalIf,
        //   )
        // ],
        className,
      )}
    >
      {realChildren.map((child, index) => (
        <div key={index} className={childClassName(index)}>
          {child}
        </div>
      ))}
    </div>
  )
}

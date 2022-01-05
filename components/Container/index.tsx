import classnames from 'classnames'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ContainerProps {
  children: ReactNode
  max?: 'small' | 'medium' | 'large'
  className?: string
}

export function Container({
  children,
  className,
  max = 'large',
}: ContainerProps) {
  return (
    <div
      className={classnames(
        styles.container,
        styles[`container-${max}`],
        className,
      )}
    >
      {children}
    </div>
  )
}

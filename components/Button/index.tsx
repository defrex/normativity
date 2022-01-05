import classnames from 'classnames'
import React, {
  createElement,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref,
} from 'react'
import { spacing } from '../../lib/spacing'
import { Inline } from '../Inline'
import { Inset } from '../Inset'
import { Text } from '../Text'
import styles from './styles.module.scss'

interface ButtonProps {
  disabled?: boolean
  element?: 'button' | 'submit' | 'a'
  href?: string
  icon?: ReactNode
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  text?: string
  type?: 'primary' | 'secondary' | 'plain' | 'plain-dark'
}

export const Button = forwardRef(function Button(
  {
    disabled = false,
    text,
    icon,
    type = 'primary',
    element = 'a',
    href,
    onClick,
  }: ButtonProps,
  ref: Ref<HTMLAnchorElement>,
) {
  return createElement(
    element,
    {
      className: classnames(
        styles.button,
        styles[type],
        disabled ? styles.buttonDisabled : null,
        disabled ? styles[`${type}Disabled`] : null,
      ),
      ref,
      href,
      onClick,
      disabled,
    },
    <Inset squish spacing={spacing.large}>
      <Inline align='center'>
        {icon}
        {text ? (
          <Text
            value={text}
            className={classnames(styles.buttonText, styles[`${type}Text`])}
            uppercase
          />
        ) : null}
      </Inline>
    </Inset>,
  )
})

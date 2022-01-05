import classnames from 'classnames'
import { Spacing } from './spacing'

export type ScreenSizes = 'small' | 'medium' | 'large'

export interface ScreenConditions {
  lte?: ScreenSizes
  eq?: ScreenSizes
  gte?: ScreenSizes
}

export type ConditionalSpacing = Partial<
  Record<`${'lte' | 'eq' | 'gte'}-${ScreenSizes}`, Spacing>
>

export function classNameForScreenConditions(
  prefix: string,
  screenProp?: ScreenConditions,
): string {
  if (!screenProp) {
    return ''
  }
  return classnames(
    screenProp.lte ? `${prefix}-lte-${screenProp.lte}` : null,
    screenProp.eq ? `${prefix}-eq-${screenProp.eq}` : null,
    screenProp.gte ? `${prefix}-gte-${screenProp.gte}` : null,
  )
}

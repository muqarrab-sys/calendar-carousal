import { Grid } from 'antd'
import { CARDS_PER_VIEW } from '../constants'
import { Breakpoints } from '../types'

export default function useCalculateCardsPerView(value?: number | Breakpoints) {
  const { xs, sm, md, lg, xl, xxl } = Grid.useBreakpoint()

  if (value === undefined) return xs ? 1 : CARDS_PER_VIEW
  if (typeof value === 'number') return value

  if (Object.keys(value).some((key) => !!(value as any)[key])) {
    if (xs) return (value?.xs || value?.sm || value?.md || value?.lg || value?.xl || value?.xxl) as number
    else if (sm && !md) return (value?.sm || value?.md || value?.lg || value?.xl || value?.xxl || value?.xs) as number
    else if (md && !lg) return (value?.md || value?.lg || value?.xl || value?.xxl || value?.sm || value?.xs) as number
    else if (lg && !xl) return (value?.lg || value?.xl || value?.xxl || value?.md || value?.sm || value?.xs) as number
    else if (xl && !xxl) return (value?.xl || value?.xxl || value?.lg || value?.md || value?.sm || value?.xs) as number
    else if (xxl) return (value?.xxl || value?.xl || value?.lg || value?.md || value?.sm || value?.xs) as number
  }

  return xs ? 1 : CARDS_PER_VIEW
}

import { Grid } from 'antd'
import { Breakpoints } from '../types'

export default function useCalculateCardsPerView(value: number | Breakpoints) {
  const { xs, sm, md, lg, xl, xxl } = Grid.useBreakpoint()

  if (typeof value === 'number') return value

  if (xs) return value?.xs || value?.sm || value?.md || value?.lg || value?.xl || value?.xxl || 1
  else if (sm && !md) return value?.sm || value?.md || value?.lg || value?.xl || value?.xxl || value?.xs || 1
  else if (md && !lg) return value?.md || value?.lg || value?.xl || value?.xxl || value?.sm || value?.xs || 3
  else if (lg && !xl) return value?.lg || value?.xl || value?.xxl || value?.md || value?.sm || value?.xs || 4
  else if (xl && !xxl) return value?.xl || value?.xxl || value?.lg || value?.md || value?.sm || value?.xs || 5
  else if (xxl) return value?.xxl || value?.xl || value?.lg || value?.md || value?.sm || value?.xs || 6

  return 3
}

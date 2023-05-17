import { Dayjs } from 'dayjs'

export interface Formats {
  /**
   * @default  'DD, MMMM YYYY'
   */
  date?: string
  /**
   * @default 'h:mm a'
   */
  time?: string
}

export interface IDate<T = Dayjs> {
  date: T
  isCurrent?: boolean
  closed?: boolean
}

export interface GetDateArgs<T = Dayjs> {
  /**
   * @default 10
   */
  radius?: number
  from?: T
  to?: T
  closedDays: ClosedDays
}

export type ClosedDays = Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>

export interface IBreakpoints {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export type Breakpoints = RequireAtLeastOne<IBreakpoints, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

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

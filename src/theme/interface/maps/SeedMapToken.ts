import { Breakpoints } from '../../../types'

export default interface SeedMapToken {
  /**
   * @desc Calender card size
   * @default 170
   */
  calenderCardSize: number
  /**
   * @desc Calender card gap
   * @default 10
   */
  calenderCardGap: number
  /**
   * @desc Calender cards shown per view
   * @default 3
   */
  calenderCardsPerView: number | Breakpoints
}

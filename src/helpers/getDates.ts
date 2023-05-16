import dayjs from 'dayjs'
import { GetDateArgs } from '../types'
import getDateList from './getDateList'

/**
 * Takes from and to dates and returns an array of all dates in between.
 * or alternatively a radius can be supplied which will return all dates with in that radius from current date.
 *
 * @deprecated since version 1.1.0
 * @param GetDateArgs
 * @returns Array<IDate>
 */
export default function getDates(options?: GetDateArgs) {
  const radius = options?.radius || 10
  const date = options?.from || dayjs()
  const from = options?.to ? date : date.subtract(radius, 'days')
  const to = options?.to || date.add(radius, 'days')

  return getDateList(from, to, options?.closedDays)
}

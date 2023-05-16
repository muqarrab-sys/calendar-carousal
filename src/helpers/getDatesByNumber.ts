import dayjs from 'dayjs'
import { ClosedDays } from '../types'
import getDateList from './getDateList'

/**
 * Takes a number and returns a list of dates from current date to the next number of days
 *
 * @param {number} number - Numbers to add
 * @param {dayjs.ManipulateType} type - Add by type, for example "days" or "months"
 * @param {ClosedDays} closedDays - Array of days in week that are closed
 *
 */
export default function getDatesByNumber(number: number, type: dayjs.ManipulateType, closedDays?: ClosedDays) {
  const now = dayjs()
  const end = now.add(number, type)

  return getDateList(now, end, closedDays)
}

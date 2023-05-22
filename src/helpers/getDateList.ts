import { Dayjs } from 'dayjs'
import { ClosedDays, IDate } from '../types'

/**
 * Takes a number and returns a list of dates from current date to the next number of days
 *
 * @param {Dayjs} start - Starting date of the list
 * @param {Dayjs} end - Ending Date of the lst
 * @param {ClosedDays} closedDays - Array of days in week that are closed
 *
 */
export default function getDateList(start: Dayjs, end: Dayjs, closedDays?: ClosedDays) {
  const dates: Array<IDate> = []

  let work = true
  let i = 0
  while (work) {
    const nextDate = start.add(i, 'days')

    dates.push({
      date: nextDate,
      closed: closedDays?.some((item) => item === nextDate.format('dddd')) || false,
    })

    if (end.valueOf() === nextDate.valueOf()) work = false
    i += 1
  }

  return dates
}

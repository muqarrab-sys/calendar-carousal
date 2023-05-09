import dayjs, { Dayjs } from 'dayjs'

export interface IDates<T = Dayjs> {
  date: T
  isCurrent?: boolean
}

export interface GetDateArgs {
  /**
   * @default 10
   */
  radius?: number
  from?: Dayjs
  to?: Dayjs
}

/**
 * Takes from and to dates and returns an array of all dates in between.
 * or alternatively a radius can be supplied which will return all dates with in that radius from current date.
 *
 * @param GetDateArgs
 * @returns Array<IDates>
 */
export default function getDates(options?: GetDateArgs) {
  const radius = options?.radius || 10
  const date = options?.from || dayjs()
  const from = options?.to ? date : date.subtract(radius, 'days')
  const to = options?.to || date.add(radius, 'days')

  const dates: Array<IDates> = []

  let work = true
  let i = 0
  while (work) {
    const nextDate = from.add(i, 'days')

    dates.push({
      date: nextDate,
      isCurrent: nextDate.valueOf() === dayjs().valueOf(),
    })

    if (to.valueOf() === nextDate.valueOf()) work = false
    i += 1
  }

  return dates
}

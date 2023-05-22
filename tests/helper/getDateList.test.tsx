import dayjs from 'dayjs'
import { getDateList } from '../../src'

describe('getDateList', () => {
  it('returns dates', () => {
    const now = dayjs()
    const datesList = getDateList(now, now.add(9, 'day'))

    expect(datesList.length).toBe(10)
    expect(datesList.at(0)).toEqual({ closed: false, date: now })
    expect(datesList.at(-1)).toEqual({ closed: false, date: now.add(9, 'day') })
  })

  it('has only sunday closed', () => {
    const datesList = getDateList(dayjs('21, may, 2023'), dayjs('22, may, 2023'), ['Sunday'])

    expect(datesList.at(0)?.closed).toBeTruthy()
    expect(datesList.at(1)?.closed).toBeFalsy()
  })
})

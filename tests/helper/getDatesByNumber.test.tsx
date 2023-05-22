import { getDatesByNumber } from '../../src'

describe('getDatesByNumber', () => {
  it('returns a list of 10 days from now', () => {
    const datesList = getDatesByNumber(9, 'day')

    expect(datesList.length).toBe(10)
  })

  it('returns a list of dates with sundays closed', () => {
    const datesList = getDatesByNumber(13, 'day', ['Sunday'])

    datesList.forEach((item) => {
      if (item.date.format('dddd') === 'Sunday') {
        expect(item.closed).toBeTruthy()
      }
    })
  })

  it('return a list of dates with first date being the current day', () => {
    const datesList = getDatesByNumber(9, 'day')

    expect(datesList.at(0)?.date.isToday()).toBeTruthy()
  })
})

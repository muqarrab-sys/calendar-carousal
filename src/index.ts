import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

import CalendarAppointment from './CalendarAppointment'
export { CalendarCarousel, CalenderCard } from './components'
export { getDateList, getDates, getDatesByNumber } from './helpers'
export { AppointmentCalenderProvider, useAppointmentCalender } from './hooks'
export type { DesignToken } from './theme'

export default CalendarAppointment

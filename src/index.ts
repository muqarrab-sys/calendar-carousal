import dayjs from 'dayjs'
import CalendarAppointment from './CalendarAppointment'
import { CalendarCarousel, CalenderCard } from './components'
import isToday from 'dayjs/plugin/isToday'
import { getDateList, getDates, getDatesByNumber } from './helpers'
import { AppointmentCalenderProvider, useAppointmentCalender } from './hooks'

dayjs.extend(isToday)

export { CalendarCarousel, CalenderCard, getDateList, getDatesByNumber, getDates, AppointmentCalenderProvider, useAppointmentCalender }

export default CalendarAppointment

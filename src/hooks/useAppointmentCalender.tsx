import dayjs, { Dayjs } from 'dayjs'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'
import { DATE_FORMAT, DURATION_STEP, MAX_DURATION, MIN_DURATION, TIME_FORMAT } from '../constants'
import { getDatesByNumber } from '../helpers'
import { Formats, IDate } from '../types'
import { DesignToken, DesignTokenContext, ThemeContext } from '../theme'
import getDerivativeTokens from '../theme/helpers/getDerivativeTokens'

export interface AppointmentCalenderContext<T = Dayjs> {
  dates: IDate<T>[]
  formats: Formats
  values: Selected
  durationStep: number
  minDuration: number
  maxDuration: number
  setDate(datetime: T): void
  setDuration(duration: number): void
  setDatesList(prevState: IDate<T>[]): void
  addTime(value: number, type: dayjs.ManipulateType): T
  subtractTime(value: number, type: dayjs.ManipulateType): T
  increaseDuration(increaseBy: number): number
  decreaseDuration(decreaseBy: number): number
  canAddTime(by: 'hours' | 'minutes'): boolean
  canSubtractTime(by: 'hours' | 'minutes'): boolean
}

export interface AppointmentCalenderProviderProps<T = Dayjs> {
  children: ReactNode
  dates?: IDate<T>[]
  formats?: Formats
  /**
   * @default 30
   */
  durationStep?: number
  minDuration?: number
  maxDuration?: number
  token?: Partial<DesignToken>
}

export interface Selected<T = Dayjs> {
  datetime: T
  duration: number
}

const AppointmentCalender = createContext<AppointmentCalenderContext | undefined>(undefined)

export const AppointmentCalenderProvider: FC<AppointmentCalenderProviderProps> = ({ children, dates, formats, durationStep, minDuration, maxDuration, token }) => {
  const [calenderDates, setCalenderDates] = useState<IDate[]>(dates || getDatesByNumber(2, 'month'))
  const [values, __setValues] = useState<Selected>({
    datetime: calenderDates[0].date,
    duration: 60,
  })

  const setDatesList = (data: IDate[]) => {
    setCalenderDates(data)
  }

  const setDate = (datetime: Dayjs) => {
    __setValues((prev) => ({ ...prev, datetime }))
  }

  const setDuration = (duration: number) => {
    __setValues((prev) => ({ ...prev, duration }))
  }

  const increaseDuration = (increaseBy: number) => {
    const duration = values.duration + increaseBy
    __setValues((prev) => ({ ...prev, duration }))
    return duration
  }

  const decreaseDuration = (decreaseBy: number) => {
    const duration = values.duration - decreaseBy
    if (duration >= 0) {
      __setValues((prev) => ({ ...prev, duration }))
      return duration
    }
    return values.duration
  }

  const addTime = (value: number, type: dayjs.ManipulateType) => {
    const datetime = values.datetime.add(value, type)
    __setValues((prev) => ({ ...prev, datetime }))
    return datetime
  }

  const subtractTime = (value: number, type: dayjs.ManipulateType) => {
    const datetime = values.datetime.subtract(value, type)
    __setValues((prev) => ({ ...prev, datetime }))
    return datetime
  }

  const canAddTime = (by: 'hours' | 'minutes') => {
    const hour = values.datetime.format('H')
    const minute = values.datetime.format('m')

    if (by === 'hours' && hour === '23') return false
    if (by === 'minutes' && hour === '23' && minute === '59') return false

    return true
  }

  const canSubtractTime = (by: 'hours' | 'minutes') => {
    const hour = values.datetime.format('H')
    const minute = values.datetime.format('m')

    if (by === 'hours' && hour === '0') return false
    if (by === 'minutes' && hour === '0' && minute === '0') return false

    return true
  }

  return (
    <DesignTokenContext.Provider value={{ hashed: true }}>
      <ThemeContext.Provider value={getDerivativeTokens(token)}>
        <AppointmentCalender.Provider
          value={{
            values,
            setDate,
            setDatesList,
            setDuration,
            minDuration: minDuration || MIN_DURATION,
            maxDuration: maxDuration || MAX_DURATION,
            addTime,
            subtractTime,
            increaseDuration,
            decreaseDuration,
            canAddTime,
            canSubtractTime,
            dates: calenderDates,
            formats: {
              date: formats?.date || DATE_FORMAT,
              time: formats?.time || TIME_FORMAT,
            },
            durationStep: durationStep || DURATION_STEP,
          }}
        >
          {children}
        </AppointmentCalender.Provider>
      </ThemeContext.Provider>
    </DesignTokenContext.Provider>
  )
}

const useAppointmentCalender = () => {
  const context = useContext(AppointmentCalender)
  if (context === undefined) {
    throw new Error("'useAppointmentCalender' should be used within 'AppointmentCalenderProvider'")
  }

  return context
}

export default useAppointmentCalender

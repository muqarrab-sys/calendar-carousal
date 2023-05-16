import { Grid } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'
import { CARDS_GAP, CARDS_PER_VIEW, CARD_WIDTH, DATE_FORMAT, DURATION_STEP, TIME_FORMAT } from '../constants'
import { Formats, IDate } from '../types'
import { getDatesByNumber } from '../helpers'

const { useBreakpoint } = Grid

export interface StylesConfig {
  /**
   * @default 170
   */
  cardWidth: number
  /**
   * @default 10
   */
  gap: number
  /**
   * @default "xs|sm: 1, else: 3"
   */
  cardsPerView: number
}

export interface AppointmentCalenderContext<T = Dayjs> {
  dates: IDate<T>[]
  formats: Formats
  stylesConfig: StylesConfig
  values: Selected
  durationStep: number
  setDate(datetime: T): void
  setDuration(duration: number): void
  setDatesList(prevState: IDate<T>[]): void
  addTime(value: number, type: dayjs.ManipulateType): T
  subtractTime(value: number, type: dayjs.ManipulateType): T
  increaseDuration(increaseBy: number): number
  decreaseDuration(decreaseBy: number): number
}

export interface AppointmentCalenderProviderProps<T = Dayjs> {
  children: ReactNode
  dates?: IDate<T>[]
  formats?: Formats
  stylesConfigs?: Partial<StylesConfig>
  /**
   * @default 30
   */
  durationStep?: number
}

export interface Selected<T = Dayjs> {
  datetime: T
  duration: number
}

const AppointmentCalender = createContext<AppointmentCalenderContext | undefined>(undefined)

export const AppointmentCalenderProvider: FC<AppointmentCalenderProviderProps> = ({ children, dates, formats, stylesConfigs, durationStep }) => {
  const { xs } = useBreakpoint()

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

  return (
    <AppointmentCalender.Provider
      value={{
        values,
        setDate,
        setDatesList,
        setDuration,
        addTime,
        subtractTime,
        increaseDuration,
        decreaseDuration,
        dates: calenderDates,
        formats: {
          date: formats?.date || DATE_FORMAT,
          time: formats?.time || TIME_FORMAT,
        },
        stylesConfig: {
          cardsPerView: stylesConfigs?.cardsPerView || xs ? 1 : CARDS_PER_VIEW,
          cardWidth: stylesConfigs?.cardWidth || CARD_WIDTH,
          gap: stylesConfigs?.gap || CARDS_GAP,
        },
        durationStep: durationStep || DURATION_STEP,
      }}
    >
      {children}
    </AppointmentCalender.Provider>
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

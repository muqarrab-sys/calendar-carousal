import { Grid } from 'antd'
import { Dayjs } from 'dayjs'
import { RangeValue } from 'rc-picker/lib/interface'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'
import { CARDS_GAP, CARDS_PER_VIEW, CARD_WIDTH, DATE_FORMAT, TIME_FORMAT } from '../constants'
import getDates, { IDates } from '../helpers/getDates'
import { Formats } from '../types'

const { useBreakpoint } = Grid

export interface StylesConfig {
  /**
   * @default 170
   */
  cardWidth?: number
  /**
   * @default 10
   */
  gap?: number
  /**
   * @default "xs|sm: 1, else: 3"
   */
  cardsPerView?: number
}

export interface AppointmentCalenderContext<T = Dayjs> {
  dates: IDates<T>[]
  formats: Formats
  stylesConfig: StylesConfig
  selectedDates: Selected
  setSelectedDates(args: Partial<Selected>): void
}

export interface AppointmentCalenderProviderProps<T = Dayjs> {
  children: ReactNode
  dates?: IDates<T>[]
  formats?: Formats
  stylesConfigs?: StylesConfig
}

export interface Selected<T = Dayjs> {
  date: T
  duration: RangeValue<T>
}

const AppointmentCalender = createContext<AppointmentCalenderContext | undefined>(undefined)

export const AppointmentCalenderProvider: FC<AppointmentCalenderProviderProps> = ({ children, dates, formats, stylesConfigs }) => {
  const { xs } = useBreakpoint()

  const [calenderDates] = useState<IDates[]>(dates || getDates())
  const [selectedDates, __setSelectedDates] = useState<Selected>({
    date: calenderDates[0].date,
    duration: null,
  })

  const setSelectedDates = (args: Partial<Selected>) => {
    __setSelectedDates((prev) => ({ ...prev, ...args }))
  }

  return (
    <AppointmentCalender.Provider
      value={{
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
        selectedDates,
        setSelectedDates,
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

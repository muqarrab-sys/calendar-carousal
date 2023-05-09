import { TimePicker, Typography } from 'antd'
import { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { AppCollapsible, AppPanel, CalendarCarousel } from './components'
import { IDates } from './helpers/getDates'
import { useAppointmentCalender } from './hooks'
import { Formats } from './types'

export interface CalendarAppointmentProps {
  /**
   * @default undefined
   */
  data?: IDates[]
  /**
   * @default 170
   */
  cardWidth?: number
  /**
   * @default 10
   */
  gap?: number
  /**
   * @default 3
   */
  cardsPerView?: number
  /**
   * @default 10
   */
  formats?: Formats
  containerStyle?: React.CSSProperties
}

const CalendarAppointment: React.FC<CalendarAppointmentProps> = (props) => {
  const context = useAppointmentCalender()

  const gap = props.gap || context.stylesConfig.gap
  const dates = props.data || context.dates
  const cardWidth = props.cardWidth || context.stylesConfig.cardWidth
  const dateFormat = props.formats?.date || context.formats.date
  const TimeFormat = props.formats?.time || context.formats.time
  const cardsPerView = props.cardsPerView || context.stylesConfig.cardsPerView

  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <AppCollapsible>
      <AppPanel
        header='Date'
        open={panelOpen}
        onChange={() => setPanelOpen((prev) => !prev)}
        extra={<Typography.Text>{context.selectedDates.date?.format(dateFormat)}</Typography.Text>}
      >
        <CalendarCarousel
          data={dates}
          onSelectDate={(date: Dayjs) => {
            context.setSelectedDates({ date })
            setPanelOpen(false)
          }}
          cardsPerView={cardsPerView}
          gap={gap}
          cardWidth={cardWidth}
        />
      </AppPanel>

      <AppPanel
        header='Time'
        staticPanel
        extra={
          <TimePicker
            value={context.selectedDates.date}
            use12Hours
            format={TimeFormat}
            onChange={(date) => {
              context.setSelectedDates({ date: date as Dayjs })
            }}
          />
        }
      />

      <AppPanel
        header='Duration'
        staticPanel
        extra={
          <TimePicker.RangePicker
            value={[context.selectedDates?.date, context.selectedDates?.date?.add(1, 'hour')]}
            format={TimeFormat}
            onChange={(dates) => {
              context.setSelectedDates({ duration: dates })
            }}
          />
        }
      />
    </AppCollapsible>
  )
}

export default CalendarAppointment

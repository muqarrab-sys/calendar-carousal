import { CaretDownOutlined } from '@ant-design/icons'
import { Col, Collapse, Row, Typography, theme } from 'antd'
import { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { CalendarCarousel, TimeLever, TimePanel } from './components'
import { useAppointmentCalender, useCalculateCardsPerView } from './hooks'
import { Breakpoints, Formats, IDate } from './types'

const { Panel } = Collapse
const { Text } = Typography
export interface CalendarAppointmentProps {
  /**
   * @default undefined
   */
  data?: IDate[]
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
  cardsPerView?: number | Breakpoints
  /**
   * @default 10
   */
  formats?: Formats
  /**
   * in seconds
   *
   * @default 30
   */
  durationStep?: number
  /**
   * in seconds
   *
   * @default 30
   */
  minDuration?: number
  /**
   * in seconds
   *
   * @default 120
   */
  maxDuration?: number

  timeComponent?: React.ReactElement
  calenderComponent?: React.ReactElement
  durationComponent?: React.ReactElement

  containerStyle?: React.CSSProperties
  collapseContainerStyle?: React.CSSProperties
  durationContainerStyles?: React.CSSProperties
  cardStyles?: {
    head?: React.CSSProperties
    body?: React.CSSProperties
  }

  onChange?(args: { datetime: Dayjs; duration: number | null }): void
}

const CalendarAppointment: React.FC<CalendarAppointmentProps> = (props) => {
  const context = useAppointmentCalender()
  const { token } = theme.useToken()
  const cardsPerView = useCalculateCardsPerView(props.cardsPerView || context.stylesConfig.cardsPerView)

  const gap = props.gap || (context.stylesConfig.gap as number)
  const dates = props.data || context.dates
  const cardWidth = props.cardWidth || (context.stylesConfig.cardWidth as number)
  const dateFormat = props.formats?.date || context.formats.date
  const timeFormat = props.formats?.time || context.formats.time
  const durationStep = props.durationStep || context.durationStep
  const minDuration = props.minDuration || context.minDuration
  const maxDuration = props.maxDuration || context.maxDuration

  const [activePanel, setActivePanel] = useState<string | string[]>([])

  const onSelect = (datetime: Dayjs) => {
    context.setDate(datetime)
    setActivePanel(['2'])
    if (props?.onChange) props.onChange({ datetime, duration: context.values.duration })
  }

  const onIncreaseDuration = (amount: number) => {
    const duration = context.increaseDuration(amount)
    if (props?.onChange) props.onChange({ datetime: context.values.datetime, duration })
  }

  const onDecreaseDuration = (amount: number) => {
    const duration = context.decreaseDuration(amount)
    if (props?.onChange) props.onChange({ datetime: context.values.datetime, duration })
  }

  const hours = Math.floor(context.values.duration / 60)
  const minutes = Math.abs(context.values.duration - hours * 60)
  const PanelFontStyle = { fontSize: token.fontSizeHeading5, fontWeight: token.fontWeightStrong }

  return (
    <div style={{ minWidth: cardWidth * cardsPerView + gap * (cardsPerView + 1) + token.size * 2, ...props.containerStyle }}>
      <Collapse
        style={props.collapseContainerStyle}
        onChange={(key) => setActivePanel(key)}
        activeKey={activePanel}
        expandIconPosition={'end'}
        expandIcon={() => <CaretDownOutlined style={{ ...PanelFontStyle, color: token.colorPrimary }} />}
        ghost
      >
        <Panel
          key='1'
          header={<Text style={PanelFontStyle}>Date</Text>}
          extra={<Text style={PanelFontStyle}>{context.values.datetime?.isToday() ? 'Today' : context.values.datetime?.format(dateFormat)}</Text>}
        >
          {props.calenderComponent ? (
            React.cloneElement(props.calenderComponent)
          ) : (
            <CalendarCarousel data={dates} onSelectDate={onSelect} cardsPerView={cardsPerView} gap={gap} cardWidth={cardWidth} cardStyles={props.cardStyles} />
          )}
        </Panel>

        <Panel key='2' header={<Text style={PanelFontStyle}>Time</Text>} extra={<Text style={PanelFontStyle}>{context.values.datetime?.format(timeFormat)} </Text>}>
          {props?.timeComponent ? React.cloneElement(props.timeComponent) : <TimePanel onChange={props.onChange} />}
        </Panel>
      </Collapse>

      <Row justify={'space-between'} style={{ padding: `${token.sizeSM}px ${token.size}px`, ...props.durationContainerStyles }}>
        <Col span={12}>
          <Text style={PanelFontStyle}>Duration</Text>
        </Col>

        <Col span={12} style={{ textAlign: 'right' }}>
          {props?.durationComponent ? (
            React.cloneElement(props.durationComponent)
          ) : (
            <TimeLever
              disableLeft={typeof minDuration === 'number' ? context.values.duration <= minDuration : false}
              disableRight={typeof maxDuration === 'number' ? context.values.duration >= maxDuration : false}
              onLeftPress={() => onDecreaseDuration(durationStep)}
              onRightPress={() => onIncreaseDuration(durationStep)}
              middle={`${hours}:${minutes}`}
              justify={'end'}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default CalendarAppointment

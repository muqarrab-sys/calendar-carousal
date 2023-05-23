import { Col, Radio, Row } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import { TimeLever } from '../'
import { useAppointmentCalender } from '../../hooks'

interface TimePanelProps {
  onChange?(args: { datetime: Dayjs; duration: number | null }): void
}

const TimePanel: React.FC<TimePanelProps> = (props) => {
  const context = useAppointmentCalender()

  const onAddTime = (amount: number, type: dayjs.ManipulateType) => {
    const datetime = context.addTime(amount, type)
    if (props?.onChange) props.onChange({ datetime, duration: context.values.duration })
  }

  const onSubtractTime = (amount: number, type: dayjs.ManipulateType) => {
    const datetime = context.subtractTime(amount, type)
    if (props?.onChange) props.onChange({ datetime, duration: context.values.duration })
  }

  return (
    <Row wrap gutter={[0, 16]}>
      <Col xs={24} sm={8} md={8}>
        <TimeLever
          disableLeft={!context.canSubtractTime('hours')}
          disableRight={!context.canAddTime('hours')}
          onRightPress={() => onAddTime(1, 'hour')}
          onLeftPress={() => onSubtractTime(1, 'hour')}
          middle={context.values.datetime.format('h')}
        />
      </Col>

      <Col xs={24} sm={8} md={8}>
        <TimeLever
          disableLeft={!context.canSubtractTime('minutes')}
          disableRight={!context.canAddTime('minutes')}
          onRightPress={() => onAddTime(1, 'minute')}
          onLeftPress={() => onSubtractTime(1, 'minute')}
          middle={context.values.datetime.format('mm')}
        />
      </Col>

      <Col xs={24} sm={8} md={8} style={{ textAlign: 'center' }}>
        <Radio.Group
          value={context.values.datetime.format('a')}
          buttonStyle='solid'
          onChange={(event) => {
            if (event.target.value === 'am') {
              onSubtractTime(12, 'hour')
            } else {
              onAddTime(12, 'hour')
            }
          }}
        >
          <Radio.Button value='am'>AM</Radio.Button>
          <Radio.Button value='pm'>PM</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  )
}

export default TimePanel

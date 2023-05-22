import { Card, Typography, theme } from 'antd'
import { Dayjs } from 'dayjs'
import React, { MouseEvent } from 'react'
const { useToken } = theme
const { Title, Text } = Typography

export interface CalenderCardProps {
  date: Dayjs
  closed?: boolean
  width?: number
  onClick?: (e: MouseEvent) => void
  headStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
}

const unSelectable: React.CSSProperties = {
  userSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
}

const CalenderCard: React.FC<CalenderCardProps> = ({ date, closed, width, onClick, headStyle, bodyStyle }) => {
  const { token } = useToken()

  return (
    <Card
      hoverable={!closed}
      title={<Text style={{ ...unSelectable, fontSize: token.fontSizeHeading4, color: token.colorWhite }}>{date.format('MMMM')}</Text>}
      headStyle={{
        backgroundColor: closed ? token.colorTextDisabled : token['red-6'],
        color: 'white',
        textAlign: 'center',
        ...headStyle,
      }}
      bodyStyle={{
        padding: '0 24px',
        textAlign: 'center',
        height: (width || 0) / 1.1,
        ...bodyStyle,
      }}
      style={{ width: width }}
      onClick={(e) => {
        if (!closed && onClick) {
          onClick(e)
        }
      }}
    >
      <Title style={{ ...unSelectable }} type='secondary'>
        {date.date()}
      </Title>
      <Title style={{ ...unSelectable }} level={4} type='secondary'>
        {closed ? 'Closed' : date.format('dddd')}
      </Title>
    </Card>
  )
}

export default CalenderCard

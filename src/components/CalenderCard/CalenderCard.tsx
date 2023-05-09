import { Card, Typography, theme } from 'antd'
import { Dayjs } from 'dayjs'
import React from 'react'
const { useToken } = theme
const { Title, Text } = Typography

export interface CalenderCardProps {
  date: Dayjs
  closed?: boolean
  width?: number
  onClick?: () => void
}

const unSelectable: React.CSSProperties = {
  userSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
}

const CalenderCard: React.FC<CalenderCardProps> = ({ date, closed, width, onClick }) => {
  const { token } = useToken()

  return (
    <Card
      hoverable
      title={<Text style={{ ...unSelectable, fontSize: token.fontSizeHeading4, color: token.colorWhite }}>{date.format('MMMM')}</Text>}
      headStyle={{
        backgroundColor: closed ? token.colorTextDisabled : token['red-6'],
        color: 'white',
        textAlign: 'center',
      }}
      bodyStyle={{
        padding: '0 24px',
        textAlign: 'center',
        height: (width || 0) / 1.1,
      }}
      style={{ width: width }}
      onClick={onClick}
    >
      <Title style={{ ...unSelectable }} type='secondary'>
        {date.date()}
      </Title>
      <Title style={{ ...unSelectable }} level={4} type='secondary'>
        {date.format('dddd')}
      </Title>
    </Card>
  )
}

export default CalenderCard

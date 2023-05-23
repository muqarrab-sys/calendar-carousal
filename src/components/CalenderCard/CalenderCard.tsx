import { Card, Typography, theme } from 'antd'
import { Dayjs } from 'dayjs'
import React, { MouseEvent } from 'react'
import { useToken } from '../../theme'
const { Text } = Typography

const { useToken: useAntToken } = theme
export interface CalenderCardProps {
  date: Dayjs
  closed?: boolean
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

const CalenderCard: React.FC<CalenderCardProps> = ({ date, closed, onClick, headStyle, bodyStyle }) => {
  const { token: antToken } = useAntToken()
  const [, token] = useToken()

  return (
    <Card
      hoverable={!closed}
      title={<Text style={{ ...unSelectable, fontSize: token.fontSizeXL, color: antToken.colorWhite }}>{date.format('MMMM')}</Text>}
      headStyle={{
        backgroundColor: closed ? token.calenderDisabledColor : token.calenderColor,
        color: 'white',
        textAlign: 'center',
        ...headStyle,
      }}
      bodyStyle={{
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        height: (token.calenderCardSize || 0) / 1.1,
        ...bodyStyle,
      }}
      style={{ width: token.calenderCardSize }}
      onClick={(e) => {
        if (!closed && onClick) {
          onClick(e)
        }
      }}
    >
      <Text style={{ ...unSelectable, color: token.calenderTextColor, fontSize: token.calenderDateFontSize }}>{date.date()}</Text>
      <Text style={{ ...unSelectable, color: token.calenderTextColor, fontSize: token.fontSizeXL }}>{closed ? 'Closed' : date.format('dddd')}</Text>
    </Card>
  )
}

export default CalenderCard

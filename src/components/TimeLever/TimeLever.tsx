import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row, RowProps, Typography, theme } from 'antd'
import React from 'react'
import { useToken } from '../../theme'

const { Text } = Typography

interface TimeLeverProps {
  onLeftPress(): void
  onRightPress(): void
  middle: string | React.ReactElement
  justify?: RowProps['justify']
  align?: RowProps['align']
  disableLeft?: boolean
  disableRight?: boolean
}

const TimeLever: React.FC<TimeLeverProps> = ({ onLeftPress, onRightPress, middle, justify = 'center', align = 'middle', disableLeft, disableRight }) => {
  const { token: antToken } = theme.useToken()
  const [, token] = useToken()

  return (
    <Row gutter={10} justify={justify} align={align}>
      <Col>
        <Button
          disabled={disableLeft}
          shape='circle'
          icon={<MinusOutlined style={{ color: antToken.colorPrimary }} />}
          onClick={onLeftPress}
          style={{ borderColor: antToken.colorPrimary }}
        />
      </Col>

      <Col span={10} style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: token.fontSizeLG }}>{middle}</Text>
      </Col>

      <Col>
        <Button
          disabled={disableRight}
          shape='circle'
          icon={<PlusOutlined style={{ color: antToken.colorPrimary }} />}
          onClick={onRightPress}
          style={{ borderColor: antToken.colorPrimary }}
        />
      </Col>
    </Row>
  )
}

export default TimeLever

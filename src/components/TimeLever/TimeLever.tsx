import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row, RowProps, Typography, theme } from 'antd'
import React from 'react'

const { Text } = Typography

interface TimeLeverProps {
  onLeftPress(): void
  onRightPress(): void
  middle: any
  justify?: RowProps['justify']
  align?: RowProps['align']
}

const TimeLever: React.FC<TimeLeverProps> = ({ onLeftPress, onRightPress, middle, justify = 'center', align = 'middle' }) => {
  const { token } = theme.useToken()

  return (
    <Row gutter={10} justify={justify} align={align}>
      <Col>
        <Button shape='circle' icon={<MinusOutlined style={{ color: token.colorPrimary }} />} onClick={onLeftPress} style={{ borderColor: token.colorPrimary }} />
      </Col>

      <Col span={10} style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: token.fontSizeHeading5 }}>{middle}</Text>
      </Col>

      <Col>
        <Button shape='circle' icon={<PlusOutlined style={{ color: token.colorPrimary }} />} onClick={onRightPress} style={{ borderColor: token.colorPrimary }} />
      </Col>
    </Row>
  )
}

export default TimeLever

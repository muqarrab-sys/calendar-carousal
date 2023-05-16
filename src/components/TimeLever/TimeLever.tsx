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
  span?: [number | undefined, number | undefined, number | undefined]
}

const TimeLever: React.FC<TimeLeverProps> = ({ onLeftPress, onRightPress, middle, justify = 'center', align = 'middle' }) => {
  const { token } = theme.useToken()

  return (
    <Row gutter={10} justify={justify} align={align}>
      <Col>
        <Button shape='circle' icon={<MinusOutlined />} onClick={onLeftPress} />
      </Col>

      <Col span={10} style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: token.fontSizeHeading5 }}>{middle}</Text>
      </Col>

      <Col>
        <Button shape='circle' icon={<PlusOutlined />} onClick={onRightPress} />
      </Col>
    </Row>
  )
}

export default TimeLever

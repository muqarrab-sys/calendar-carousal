import { Row } from 'antd'
import React from 'react'

interface AppCollapsibleProps {
  children: React.ReactNode
}

const AppCollapsible: React.FC<AppCollapsibleProps> = ({ children }) => {
  return <Row gutter={[20, 20]}>{children}</Row>
}

export default AppCollapsible

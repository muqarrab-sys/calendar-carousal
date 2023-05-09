import { Col, Row, Typography } from 'antd'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

export interface AppPanelProps {
  /**
   * If true, panel will not open.
   */
  staticPanel?: boolean
  header?: string
  extra?: string | ReactNode
  children?: ReactNode
  /**
   * If provided, panel will become controlled and should be manually opened and closed.
   *
   * @default undefined
   */
  open?: boolean
  /**
   * Callback on toggling panel open/close.
   * Must be used to set panel open/close if control is taken by providing 'open' prop.
   */
  onChange?(): void
}
const AppPanel: React.FC<AppPanelProps> = ({ header, extra, staticPanel, open, onChange, children }) => {
  const isControlled = open !== undefined

  const panelRef = useRef<HTMLDivElement>()
  const [animation, setAnimation] = useState({
    maxHeight: open ? (panelRef.current?.scrollHeight as number) : 0,
  })

  const togglePanel = () => {
    const shouldOpen = isControlled ? open : !animation.maxHeight

    if (shouldOpen) {
      setAnimation((prev) => ({ ...prev, maxHeight: panelRef.current?.scrollHeight as number }))
    } else {
      setAnimation((prev) => ({ ...prev, maxHeight: 0 }))
    }
  }

  useEffect(() => {
    if (isControlled) togglePanel()
  }, [open])

  return (
    <Col span={24}>
      <Row
        onClick={() => {
          if (!staticPanel) {
            if (!isControlled) {
              togglePanel()
            }
            onChange && onChange()
          }
        }}
        style={{ cursor: staticPanel ? 'auto' : 'pointer' }}
        align='middle'
        justify={'space-between'}
      >
        <Col>
          <Typography.Title level={5}>{header}</Typography.Title>
        </Col>

        <Col>{extra}</Col>
      </Row>

      {!staticPanel && (
        <Row
          ref={(node) => {
            if (node) panelRef.current = node
          }}
          style={{
            maxHeight: animation.maxHeight,
            overflow: 'hidden',
            transition: 'max-height 0.2s ease-out',
          }}
          justify={'center'}
          align={'middle'}
        >
          <Col>{children}</Col>
        </Row>
      )}
    </Col>
  )
}

export default AppPanel

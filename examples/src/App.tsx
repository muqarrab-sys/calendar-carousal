import { Col, Row } from 'antd'
import React from 'react'
import AppointmentCalenderCarousel, { useAppointmentCalender } from 'appointment-calendar-carousal'

function App() {
  const appointment = useAppointmentCalender()

  return (
    <Row justify='center' align='middle'>
      <Col>
        <AppointmentCalenderCarousel />
      </Col>
    </Row>
  )
}

export default App

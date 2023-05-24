import AppointmentCalenderCarousel, { AppointmentCalenderProvider, getDatesByNumber } from 'appointment-calendar-carousal'
import React from 'react'

const data = getDatesByNumber(3, 'month', ['Saturday', 'Sunday'])

const ExampleComponent = () => {
  return <AppointmentCalenderCarousel dates={data} onChange={(e) => console.log(e)} />
}

function Simple() {
  return (
    <AppointmentCalenderProvider>
      <ExampleComponent />
    </AppointmentCalenderProvider>
  )
}

export default Simple

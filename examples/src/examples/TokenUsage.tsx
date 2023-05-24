import AppointmentCalenderCarousel, { AppointmentCalenderProvider, DesignToken, getDatesByNumber } from 'appointment-calendar-carousal'
import React from 'react'

const data = getDatesByNumber(3, 'month', ['Saturday', 'Sunday'])

const ExampleComponent = () => {
  return <AppointmentCalenderCarousel dates={data} onChange={(e) => console.log(e)} />
}

function TokenUsage() {
  const token: Partial<DesignToken> = {
    calenderColor: '#12a123',
    calenderDisabledColor: '#7c7c7c',
    calenderDateFontSize: 60,
    calenderTextColor: '#12a123',
    calenderCardsPerView: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 },
    calenderCardSize: 210,
    calenderCardGap: 15,
  }

  return (
    <AppointmentCalenderProvider token={token}>
      <ExampleComponent />
    </AppointmentCalenderProvider>
  )
}

export default TokenUsage

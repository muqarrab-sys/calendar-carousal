import { render } from '@testing-library/react'
import React from 'react'
import CalendarAppointment, { getDatesByNumber } from '../src'

import 'jest-canvas-mock'
import { AppointmentCalenderProvider } from '../src/hooks'

describe('App', () => {
  it('renders', () => {
    render(
      <AppointmentCalenderProvider>
        <CalendarAppointment />
      </AppointmentCalenderProvider>,
    )
  })

  it('renders with custom data', () => {
    render(
      <AppointmentCalenderProvider>
        <CalendarAppointment dates={getDatesByNumber(10, 'day')} />
      </AppointmentCalenderProvider>,
    )
  })
})

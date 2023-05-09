import { render } from '@testing-library/react'
import React from 'react'
import CalendarAppointment from '../src'

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
})

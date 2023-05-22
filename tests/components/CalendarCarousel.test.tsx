import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { CalendarCarousel, getDates } from '../../src'

describe('Carousel', () => {
  it('Renders', () => {
    render(<CalendarCarousel data={getDates()} />)
  })
})

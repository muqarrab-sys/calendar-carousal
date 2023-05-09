import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { CalendarCarousel } from '../../src/components'
import getDate from '../../src/helpers/getDates'

describe('Carousel', () => {
  it('Renders', () => {
    render(<CalendarCarousel data={getDate()} />)
  })
})

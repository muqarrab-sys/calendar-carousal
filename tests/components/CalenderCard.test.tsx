import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { CalenderCard } from '../../src/components'

import 'jest-canvas-mock'

describe('Calender Card', () => {
  it('Renders', () => {
    render(<CalenderCard date={dayjs()} />)
  })
})

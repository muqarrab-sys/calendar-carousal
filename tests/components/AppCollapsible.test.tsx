import { render } from '@testing-library/react'
import * as React from 'react'
import { AppCollapsible, AppPanel } from '../../src/components'

import 'jest-canvas-mock'

describe('Collapsible Panel', () => {
  it('Renders', () => {
    render(
      <AppCollapsible>
        <AppPanel header='Test Panel 1' />
        <AppPanel header='Test Panel 2' extra={<div />} />
      </AppCollapsible>,
    )
  })
})

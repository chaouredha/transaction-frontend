import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { describe, it } from '@jest/globals'
import App from 'app/App'

describe('Notification', () => {
  it('displays Notification', () => {
    const { asFragment } = render(
      <App>
        contenu
      </App>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})

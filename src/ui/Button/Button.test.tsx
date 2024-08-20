import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('ui/Button', () => {
  test('first test', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import Card from './components/Card'

test('renders Card component', () => {
  render(<Card><p>Test content</p></Card>)
  expect(screen.getByText('Test content')).toBeInTheDocument()
})
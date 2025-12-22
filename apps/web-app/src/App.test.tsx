import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './app/App'

test('renders App component', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText(/Каталог пицц/i)).toBeInTheDocument()
})
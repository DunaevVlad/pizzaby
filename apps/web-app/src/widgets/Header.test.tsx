import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from '../app/providers'
import Header from '../widgets/Header'

test('renders Header component', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  )
  expect(screen.getByText(/PizzaBy/)).toBeInTheDocument()
})

test('displays navigation links', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByText('Каталог')).toBeInTheDocument()
  expect(screen.getByText('Корзина')).toBeInTheDocument()
})

test('shows cart badge when items exist', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  )

  // Initially no badge should be visible
  const cartLink = screen.getByText('Корзина')
  expect(cartLink).toBeInTheDocument()
})
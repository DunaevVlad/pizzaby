import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from './app/providers'
import HomePage from './pages/HomePage'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

test('renders HomePage component', () => {
  renderWithRouter(
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
  expect(screen.getByText(/Каталог пицц/i)).toBeInTheDocument()
})

test('displays pizza catalog', () => {
  renderWithRouter(
    <AppProvider>
      <HomePage />
    </AppProvider>
  )

  // Check if pizza names are displayed
  expect(screen.getByText('Маргарита')).toBeInTheDocument()
  expect(screen.getByText('Пепперони')).toBeInTheDocument()
  expect(screen.getByText('Четыре сыра')).toBeInTheDocument()
  expect(screen.getByText('Вегетарианская')).toBeInTheDocument()
})

test('displays pizza prices', () => {
  renderWithRouter(
    <AppProvider>
      <HomePage />
    </AppProvider>
  )

  // Check if prices are displayed (formatted)
  expect(screen.getByText('300 ₽')).toBeInTheDocument()
  expect(screen.getByText('350 ₽')).toBeInTheDocument()
  expect(screen.getByText('400 ₽')).toBeInTheDocument()
  expect(screen.getByText('320 ₽')).toBeInTheDocument()
})

test('has select buttons for each pizza', () => {
  renderWithRouter(
    <AppProvider>
      <HomePage />
    </AppProvider>
  )

  // Check if select buttons are present
  const selectButtons = screen.getAllByText('Выбрать')
  expect(selectButtons).toHaveLength(4)
})

test('handles image loading errors', () => {
  renderWithRouter(
    <AppProvider>
      <HomePage />
    </AppProvider>
  )

  // Find all pizza images
  const images = screen.getAllByRole('img')
  expect(images).toHaveLength(5)

  // Simulate error on first pizza image (skip hero image)
  fireEvent.error(images[1])

  // Check that the src has been changed to placeholder
  expect(images[1]).toHaveAttribute('src', 'https://via.placeholder.com/300x200?text=%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0')
})
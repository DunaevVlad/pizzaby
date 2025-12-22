import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PizzaConstructorPage from './PizzaConstructorPage'
import { AppProvider } from '../app/providers'
import { PIZZAS } from 'shared'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 'margherita' })
}))

describe('PizzaConstructorPage', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AppProvider>
          <PizzaConstructorPage />
        </AppProvider>
      </MemoryRouter>
    )

  it('renders pizza constructor', () => {
    renderComponent()
    expect(screen.getByText('🍕 Настройка пиццы')).toBeInTheDocument()
    expect(screen.getByText(PIZZAS[0].name)).toBeInTheDocument()
  })

  it('allows size selection', () => {
    renderComponent()
    const selects = screen.getAllByRole('combobox')
    const sizeSelect = selects[0]
    fireEvent.change(sizeSelect, { target: { value: 'large' } })
    expect(sizeSelect).toHaveValue('large')
  })

  it('allows dough selection', () => {
    renderComponent()
    const selects = screen.getAllByRole('combobox')
    const doughSelect = selects[1]
    fireEvent.change(doughSelect, { target: { value: 'thick' } })
    expect(doughSelect).toHaveValue('thick')
  })

  it('allows ingredient selection', () => {
    renderComponent()
    const cheeseCheckbox = screen.getByRole('checkbox', { name: /Сыр/ })
    fireEvent.click(cheeseCheckbox)
    expect(cheeseCheckbox).toBeChecked()
  })

  it('adds to cart on submit', () => {
    renderComponent()
    const button = screen.getByText('Добавить в корзину')
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })
})
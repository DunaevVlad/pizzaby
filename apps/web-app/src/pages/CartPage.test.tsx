import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartPage from './CartPage'
import { AppProvider } from '../app/providers'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('CartPage', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AppProvider>
          <CartPage />
        </AppProvider>
      </MemoryRouter>
    )

  it('shows empty cart message', () => {
    renderComponent()
    expect(screen.getByText('🛒 Корзина пуста')).toBeInTheDocument()
  })

  it('shows cart items when present', () => {
    // Mock cart with items
    const mockDispatch = jest.fn()
    jest.spyOn(require('../app/providers'), 'useApp').mockReturnValue({
      state: {
        cart: [{
          id: '1',
          configuration: {
            pizza: { name: 'Margherita', image: '', description: '' },
            size: { name: 'Medium', multiplier: 1 },
            doughType: { name: 'Thin', price: 0 },
            ingredients: [],
            quantity: 1,
            totalPrice: 500
          }
        }],
        orders: []
      },
      dispatch: mockDispatch
    })

    renderComponent()
    expect(screen.getByText('🛒 Корзина')).toBeInTheDocument()
    expect(screen.getByText('Margherita')).toBeInTheDocument()
  })

  it('allows quantity update', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(require('../app/providers'), 'useApp').mockReturnValue({
      state: {
        cart: [{
          id: '1',
          configuration: {
            pizza: { name: 'Margherita', image: '', description: '' },
            size: { name: 'Medium', multiplier: 1 },
            doughType: { name: 'Thin', price: 0 },
            ingredients: [],
            quantity: 1,
            totalPrice: 500
          }
        }],
        orders: []
      },
      dispatch: mockDispatch
    })

    renderComponent()
    const plusButton = screen.getByText('+')
    fireEvent.click(plusButton)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: '1', quantity: 2 }
    })
  })

  it('allows item removal', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(require('../app/providers'), 'useApp').mockReturnValue({
      state: {
        cart: [{
          id: '1',
          configuration: {
            pizza: { name: 'Margherita', image: '', description: '' },
            size: { name: 'Medium', multiplier: 1 },
            doughType: { name: 'Thin', price: 0 },
            ingredients: [],
            quantity: 1,
            totalPrice: 500
          }
        }],
        orders: []
      },
      dispatch: mockDispatch
    })

    renderComponent()
    const removeButton = screen.getByText('Удалить')
    fireEvent.click(removeButton)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: '1'
    })
  })
})
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import OrderStatusPage from './OrderStatusPage'
import { AppProvider } from '../app/providers'

const mockParams = { id: '1' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams
}))

describe('OrderStatusPage', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AppProvider>
          <OrderStatusPage />
        </AppProvider>
      </MemoryRouter>
    )

  it('shows order not found for invalid id', () => {
    renderComponent()
    expect(screen.getByText(/Заказ не найден/)).toBeInTheDocument()
  })

  it('shows order status for valid order', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(require('../app/providers'), 'useApp').mockReturnValue({
      state: {
        cart: [],
        currentOrder: {
          id: '1',
          items: [{
            id: '1',
            configuration: {
              pizza: { name: 'Margherita', image: '', description: '', basePrice: 500 },
              size: { name: 'Medium', multiplier: 1 },
              doughType: { name: 'Thin', price: 0 },
              ingredients: [],
              quantity: 1,
              totalPrice: 500
            }
          }],
          customerInfo: {
            name: 'John Doe',
            phone: '+1234567890',
            address: '123 Main St',
            paymentMethod: 'cash'
          },
          status: 'accepted',
          createdAt: new Date(),
          totalAmount: 500
        }
      },
      dispatch: mockDispatch
    })

    renderComponent()
    expect(screen.getByText(/Заказ #\s*1/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Принят/ })).toBeInTheDocument()
  })

  // OrderStatusPage does not dispatch status updates itself; time-based updates are triggered by CheckoutPage
})
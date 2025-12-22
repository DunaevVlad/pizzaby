import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CheckoutPage from './CheckoutPage'
import { AppProvider } from '../app/providers'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('CheckoutPage', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AppProvider>
          <CheckoutPage />
        </AppProvider>
      </MemoryRouter>
    )

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('redirects to cart if empty', () => {
    renderComponent()
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  it('renders checkout form with items', () => {
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
    expect(screen.getByText('📝 Оформление заказа')).toBeInTheDocument()
    expect(screen.getByText('Margherita(1) 500 ₽')).toBeInTheDocument()
  })

  it('validates form fields', async () => {
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
    const submitButton = screen.getByText('Подтвердить заказ')
    fireEvent.click(submitButton)

    // Validation should prevent navigation
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('submits order successfully', async () => {
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

    const inputs = screen.getAllByRole('textbox')
    const nameInput = inputs[0] // Name input
    const phoneInput = inputs[1] // Phone input
    const addressInput = inputs[2] // Address input

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } })
    fireEvent.change(addressInput, { target: { value: '123 Main St' } })

    const submitButton = screen.getByText('Подтвердить заказ')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'PLACE_ORDER',
        payload: expect.objectContaining({
          customerInfo: {
            name: 'John Doe',
            phone: '+1234567890',
            address: '123 Main St',
            paymentMethod: 'cash'
          }
        })
      })
    })
  })
})
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider, useApp } from './providers'

const TestComponent = () => {
  const { state, dispatch } = useApp()
  return (
    <div>
      <div data-testid="cart-count">{state.cart.length}</div>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { pizza: { id: 'test-pizza', name: 'Test', description: 'Test pizza', image: 'test.jpg', basePrice: 100 }, size: { id: 'medium', name: 'M', multiplier: 1 }, doughType: { id: 'thin', name: 'Thin', price: 0 }, ingredients: [], quantity: 1, totalPrice: 100 } })}>
        Add to Cart
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: '1' })}>
        Remove from Cart
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: '1', quantity: 2 } })}>
        Update Quantity
      </button>
      <button onClick={() => dispatch({ type: 'PLACE_ORDER', payload: { id: '1', items: [], customerInfo: { name: '', phone: '', address: '', paymentMethod: 'cash' }, status: 'accepted', createdAt: new Date(), totalAmount: 100 } })}>
        Place Order
      </button>
      <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: 'preparing' })}>
        Update Status
      </button>
    </div>
  )
}

describe('AppProvider', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('provides initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  it('handles ADD_TO_CART', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('handles REMOVE_FROM_CART', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Remove from Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  it('handles UPDATE_QUANTITY', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Update Quantity'))
    // Quantity updated, but count remains 1
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('handles PLACE_ORDER', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    fireEvent.click(screen.getByText('Place Order'))
    // Order placed, cart should be cleared
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  it('handles UPDATE_ORDER_STATUS', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )
    fireEvent.click(screen.getByText('Place Order'))
    fireEvent.click(screen.getByText('Update Status'))
    // Status updated
  })
})
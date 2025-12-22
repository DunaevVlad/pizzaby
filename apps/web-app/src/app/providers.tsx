import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, Order, PizzaConfiguration } from 'shared'
import { setItem, getItem } from 'shared'

interface AppState {
  cart: CartItem[]
  currentOrder: Order | null
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: PizzaConfiguration }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: Order['status'] }

const initialState: AppState = {
  cart: getItem('cart', []),
  currentOrder: getItem('currentOrder', null)
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
  case 'ADD_TO_CART': {
    const newItem: CartItem = {
      id: Date.now().toString(),
      configuration: action.payload
    }
    const newCart = [...state.cart, newItem]
    setItem('cart', newCart)
    return { ...state, cart: newCart }
  }
  case 'REMOVE_FROM_CART': {
    const newCart = state.cart.filter(item => item.id !== action.payload)
    setItem('cart', newCart)
    return { ...state, cart: newCart }
  }
  case 'UPDATE_QUANTITY': {
    const newCart = state.cart.map(item =>
      item.id === action.payload.id
        ? {
          ...item,
          configuration: {
            ...item.configuration,
            quantity: action.payload.quantity,
            totalPrice: calculateTotalPrice({
              ...item.configuration,
              quantity: action.payload.quantity
            })
          }
        }
        : item
    )
    setItem('cart', newCart)
    return { ...state, cart: newCart }
  }
  case 'CLEAR_CART': {
    setItem('cart', [])
    return { ...state, cart: [] }
  }
  case 'PLACE_ORDER': {
    setItem('currentOrder', action.payload)
    setItem('cart', [])
    return { ...state, currentOrder: action.payload, cart: [] }
  }
  case 'UPDATE_ORDER_STATUS': {
    if (!state.currentOrder) return state
    const updatedOrder = { ...state.currentOrder, status: action.payload }
    setItem('currentOrder', updatedOrder)
    return { ...state, currentOrder: updatedOrder }
  }
  default:
    return state
  }
}

function calculateTotalPrice(config: PizzaConfiguration): number {
  const basePrice = config.pizza.basePrice * config.size.multiplier
  const doughPrice = config.doughType.price
  const ingredientsPrice = config.ingredients.reduce((sum, ing) => sum + ing.price, 0)
  return (basePrice + doughPrice + ingredientsPrice) * config.quantity
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
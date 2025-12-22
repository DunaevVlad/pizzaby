import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './providers'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import OrderStatusPage from '../pages/OrderStatusPage'
import PizzaConstructorPage from '../pages/PizzaConstructorPage'

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pizza/:id" element={<PizzaConstructorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderStatusPage />} />
      </Routes>
    </AppProvider>
  )
}

export default App
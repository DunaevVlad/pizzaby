import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../widgets/Header'
import { useApp } from '../app/providers'
import { formatPrice } from 'shared'
import { Button } from 'ui-kit'

const CartPage: React.FC = () => {
  const { state, dispatch } = useApp()

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
      return
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const totalAmount = state.cart.reduce((sum, item) => sum + item.configuration.totalPrice, 0)

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-orange-800 mb-8">🛒 Корзина пуста</h1>
          <p className="text-lg text-gray-700 mb-8">
            Добавьте пиццу в корзину, чтобы оформить заказ.
          </p>
          <Link
            to="/"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg border-2 border-black shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-300 inline-block font-medium"
          >
            Перейти к каталогу
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-orange-800 mb-8">🛒 Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {state.cart.map((item) => (
              <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <img
                    src={item.configuration.pizza.image}
                    alt={item.configuration.pizza.name}
                    style={{ width: '5rem', height: '5rem', objectFit: 'cover', borderRadius: '0.5rem' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(item.configuration.pizza.name)}`
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#c2410c', fontFamily: 'Inter, sans-serif' }}>
                      {item.configuration.pizza.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
                      {item.configuration.size.name}, {item.configuration.doughType.name}
                    </p>
                    {item.configuration.ingredients.length > 0 && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
                        Доп: {item.configuration.ingredients.map(ing => ing.name).join(', ')}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.configuration.quantity - 1)}
                        style={{ width: '2rem', height: '2rem', backgroundColor: '#fed7aa', color: '#ea580c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                      >
                        -
                      </button>
                      <span style={{ width: '2rem', textAlign: 'center', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}>Кол-во: {item.configuration.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.configuration.quantity + 1)}
                        style={{ width: '2rem', height: '2rem', backgroundColor: '#fed7aa', color: '#ea580c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ fontSize: '0.875rem', color: '#ef4444', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-orange-800">Итого</h2>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Общая сумма:</span>
                <span className="text-orange-600">{formatPrice(totalAmount)}</span>
              </div>

              <Link to="/checkout" className="w-full">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  Оформить заказ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
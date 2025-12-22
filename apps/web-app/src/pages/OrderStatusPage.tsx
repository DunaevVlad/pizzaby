import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../widgets/Header'
import { useApp } from '../app/providers'
import { formatPrice, ORDER_STATUSES } from 'shared'
import { Button } from 'ui-kit'

const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { state } = useApp()

  const order = state.currentOrder

  if (!order || order.id !== id) {
    return (
      <div className="min-h-screen bg-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-orange-800 mb-8">❌ Заказ не найден</h1>
          <p className="text-lg text-gray-700 mb-8">
            Заказ с таким номером не существует или уже выполнен.
          </p>
          <Link to="/">
            <Button className="bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">Вернуться к каталогу</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentStatus = ORDER_STATUSES.find(s => s.id === order.status)

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-orange-800 mb-2">
              📋 Заказ #{order.id}
            </h1>
            <p className="text-gray-600 mb-8">
              Оформлен {order.createdAt.toLocaleString('ru-RU')}
            </p>

            {/* Status Display */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                  order.status === 'accepted' ? 'bg-yellow-100 text-yellow-600' :
                    order.status === 'preparing' ? 'bg-orange-100 text-orange-600' :
                      order.status === 'on-the-way' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                }`}>
                  <span className="text-3xl">
                    {order.status === 'accepted' ? '⏳' :
                      order.status === 'preparing' ? '👨‍🍳' :
                        order.status === 'on-the-way' ? '🚴' : '✅'}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-2 text-orange-700">
                {currentStatus?.name}
              </h2>
              <p className="text-gray-700">
                {currentStatus?.description}
              </p>
            </div>

            {/* Status Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {ORDER_STATUSES.map((status, index) => (
                  <React.Fragment key={status.id}>
                    <div className={`flex flex-col items-center ${
                      ORDER_STATUSES.findIndex(s => s.id === order.status) >= index
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}>
                      <div className={`w-4 h-4 rounded-full mb-2 ${
                        ORDER_STATUSES.findIndex(s => s.id === order.status) >= index
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`} />
                      <span className="text-xs text-center font-medium">{status.name}</span>
                    </div>
                    {index < ORDER_STATUSES.length - 1 && (
                      <div className={`w-12 h-1 rounded ${
                        ORDER_STATUSES.findIndex(s => s.id === order.status) > index
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div className="text-left bg-orange-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 text-orange-800">Детали заказа:</h3>

              <div className="space-y-2 mb-3">
                {order.items.map((item, index) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {index + 1}. {item.configuration.pizza.name}
                      {item.configuration.ingredients.length > 0 && (
                        <span className="text-gray-500">
                          {' '}({item.configuration.ingredients.map(ing => ing.name).join(', ')})
                        </span>
                      )}
                    </span>
                    <span>{formatPrice(item.configuration.totalPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Итого:</span>
                <span className="text-orange-600">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="text-left bg-orange-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 text-orange-800">Информация о доставке:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Имя:</strong> {order.customerInfo.name}</p>
                <p><strong>Телефон:</strong> {order.customerInfo.phone}</p>
                <p><strong>Адрес:</strong> {order.customerInfo.address}</p>
                <p><strong>Оплата:</strong> {order.customerInfo.paymentMethod === 'cash' ? 'Наличными' : 'Картой'}</p>
              </div>
            </div>

            {order.status === 'delivered' && (
              <div className="text-center">
                <p className="text-green-600 font-semibold mb-4 text-lg">
                  🎉 Заказ доставлен! Спасибо за выбор PizzaBy!
                </p>
                <Link to="/">
                  <Button className="bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">Заказать ещё</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatusPage
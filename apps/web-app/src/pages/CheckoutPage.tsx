import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../widgets/Header'
import { useApp } from '../app/providers'
import { formatPrice, Order } from 'shared'
import { Button, Input, Select } from 'ui-kit'

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash' as 'cash' | 'card'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalAmount = state.cart.reduce((sum, item) => sum + item.configuration.totalPrice, 0)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон'
    } else if (!/^[\+]?[0-9\-\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (state.cart.length === 0) {
      return
    }

    const order: Order = {
      id: Date.now().toString(),
      items: state.cart,
      customerInfo: formData,
      status: 'accepted',
      createdAt: new Date(),
      totalAmount
    }

    dispatch({ type: 'PLACE_ORDER', payload: order })

    // Simulate order status changes
    setTimeout(() => {
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: 'preparing' })
    }, 5000)

    setTimeout(() => {
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: 'on-the-way' })
    }, 10000)

    setTimeout(() => {
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: 'delivered' })
    }, 15000)

    navigate(`/order/${order.id}`)
  }

  if (state.cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center">📝 Оформление заказа</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-orange-800">Ваш заказ</h2>

              <div className="space-y-4 mb-4">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start p-4 bg-orange-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-orange-700 mb-1">{item.configuration.pizza.name}({item.configuration.quantity}) {formatPrice(item.configuration.totalPrice)}</p>
                      <p className="text-sm text-gray-600">
                        {item.configuration.size.name}, {item.configuration.doughType.name}
                        {item.configuration.ingredients.length > 0 && (
                          <span className="block"> + {item.configuration.ingredients.map(ing => ing.name).join(', ')}</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-orange-600">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-orange-800">Данные для доставки</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Имя"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  error={errors.name}
                  required
                />

                <Input
                  label="Телефон"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  error={errors.phone}
                  placeholder="+7 (999) 123-45-67"
                  required
                />

                <Input
                  label="Адрес доставки"
                  value={formData.address}
                  onChange={(value) => handleInputChange('address', value)}
                  error={errors.address}
                  placeholder="ул. Ленина, д. 1, кв. 1"
                  required
                />

                <Select
                  label="Способ оплаты"
                  value={formData.paymentMethod}
                  onChange={(value) => handleInputChange('paymentMethod', value)}
                  options={[
                    { value: 'cash', label: 'Наличными при доставке' },
                    { value: 'card', label: 'Картой при доставке' }
                  ]}
                />

                <Button type="submit" className="w-full mt-6 bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  Подтвердить заказ
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
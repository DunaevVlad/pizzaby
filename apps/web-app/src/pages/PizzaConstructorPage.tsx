import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../widgets/Header'
import { useApp } from '../app/providers'
import { PIZZAS, PIZZA_SIZES, DOUGH_TYPES, INGREDIENTS, formatPrice, PizzaConfiguration } from 'shared'
import { Button, Select } from 'ui-kit'

// Маппинг ингредиентов к иконкам
const INGREDIENT_ICONS: Record<string, string> = {
  cheese: '🧀',
  pepperoni: '🍖',
  mushrooms: '🍄',
  olives: '🫒',
  onions: '🧅',
  peppers: '🌶️'
}

const PizzaConstructorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const pizza = PIZZAS.find(p => p.id === id)
  if (!pizza) {
    return <div>Пицца не найдена</div>
  }

  const [selectedSize, setSelectedSize] = useState(PIZZA_SIZES[1]) // medium by default
  const [selectedDough, setSelectedDough] = useState(DOUGH_TYPES[0]) // thin by default
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

  const configuration: PizzaConfiguration = useMemo(() => {
    const ingredients = INGREDIENTS.filter(ing => selectedIngredients.includes(ing.id))
    const basePrice = pizza.basePrice * selectedSize.multiplier
    const doughPrice = selectedDough.price
    const ingredientsPrice = ingredients.reduce((sum, ing) => sum + ing.price, 0)
    const totalPrice = basePrice + doughPrice + ingredientsPrice

    return {
      pizza,
      size: selectedSize,
      doughType: selectedDough,
      ingredients,
      quantity: 1,
      totalPrice
    }
  }, [pizza, selectedSize, selectedDough, selectedIngredients])

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: configuration })
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-800 mb-8 text-center">🍕 Настройка пиццы</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pizza Image and Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(pizza.name)}`
                }}
              />
              <h2 className="text-2xl font-semibold text-orange-700 mb-2">{pizza.name}</h2>
              <p className="text-gray-700">{pizza.description}</p>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-orange-800">Настройте свою пиццу</h3>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Размер
                </label>
                <Select
                  value={selectedSize.id}
                  onChange={(value) => {
                    const size = PIZZA_SIZES.find(s => s.id === value)
                    if (size) setSelectedSize(size)
                  }}
                  options={PIZZA_SIZES.map(size => ({
                    value: size.id,
                    label: size.name
                  }))}
                />
              </div>

              {/* Dough Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип теста
                </label>
                <Select
                  value={selectedDough.id}
                  onChange={(value) => {
                    const dough = DOUGH_TYPES.find(d => d.id === value)
                    if (dough) setSelectedDough(dough)
                  }}
                  options={DOUGH_TYPES.map(dough => ({
                    value: dough.id,
                    label: `${dough.name} ${dough.price > 0 ? `(+${formatPrice(dough.price)})` : ''}`
                  }))}
                />
              </div>

              {/* Ingredients Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительные ингредиенты
                </label>
                <div className="grid grid-cols-2 gap-6">
                  {INGREDIENTS.map((ingredient) => (
                    <label key={ingredient.id} className="flex items-center space-x-4 cursor-pointer p-4 rounded-lg border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient.id)}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-lg">{INGREDIENT_ICONS[ingredient.id] || '🍕'}</span>
                      <div className="flex-1">
                        <span className="text-sm font-medium">{ingredient.name}</span>
                        <span className="text-xs text-orange-600 ml-2">(+{formatPrice(ingredient.price)})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatPrice(configuration.totalPrice)}
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaConstructorPage
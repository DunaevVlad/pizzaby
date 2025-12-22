import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../widgets/Header'
import { PIZZAS, formatPrice } from 'shared'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/hero-pizza.png"
            alt="PizzaBy - Лучшая пицца в городе"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/1920x1080?text=PizzaBy+-+Лучшая+пицца+в+городе`
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-7xl font-bold mb-6 drop-shadow-lg">🍕 PizzaBy</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Самая вкусная пицца в вашем городе! Свежие ингредиенты, традиционный рецепт, быстрая доставка.
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="text-center mb-16">
          <h2 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#9a3412', marginBottom: '1.5rem' }}>🍕 Каталог пицц</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Выберите свою идеальную пиццу из нашего разнообразного меню.
            Настраивайте размер, тесто и ингредиенты по вкусу!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', padding: '0 1rem' }}>
          {PIZZAS.map((pizza) => (
            <div key={pizza.id} className="bg-white rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(pizza.name)}`
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-orange-700 mb-3">{pizza.name}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{pizza.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange-600">
                  {formatPrice(pizza.basePrice)}
                </span>
                <Link
                  to={`/pizza/${pizza.id}`}
                  style={{ padding: '0.75rem 1.5rem', backgroundColor: '#ea580c', color: 'white', borderRadius: '0.5rem', border: '1px solid black', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: '600', textDecoration: 'none' }}
                >
                    Выбрать
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
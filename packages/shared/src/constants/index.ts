export const API_BASE_URL = 'https://api.pizzaby.com'

export interface Pizza {
  id: string
  name: string
  description: string
  image: string
  basePrice: number
}

export interface PizzaSize {
  id: string
  name: string
  multiplier: number
}

export interface DoughType {
  id: string
  name: string
  price: number
}

export interface Ingredient {
  id: string
  name: string
  price: number
  image: string
}

export interface PizzaConfiguration {
  pizza: Pizza
  size: PizzaSize
  doughType: DoughType
  ingredients: Ingredient[]
  quantity: number
  totalPrice: number
}

export interface CartItem {
  id: string
  configuration: PizzaConfiguration
}

export interface Order {
  id: string
  items: CartItem[]
  customerInfo: {
    name: string
    phone: string
    address: string
    paymentMethod: 'cash' | 'card'
  }
  status: 'accepted' | 'preparing' | 'on-the-way' | 'delivered'
  createdAt: Date
  totalAmount: number
}

export const PIZZA_SIZES: PizzaSize[] = [
  { id: 'small', name: 'Маленькая (25 см)', multiplier: 1 },
  { id: 'medium', name: 'Средняя (30 см)', multiplier: 1.2 },
  { id: 'large', name: 'Большая (35 см)', multiplier: 1.5 }
]

export const DOUGH_TYPES: DoughType[] = [
  { id: 'thin', name: 'Тонкое', price: 0 },
  { id: 'thick', name: 'Толстое', price: 50 }
]

export const INGREDIENTS: Ingredient[] = [
  { id: 'cheese', name: 'Сыр', price: 50, image: '/ingredients/cheese.png' },
  { id: 'pepperoni', name: 'Пепперони', price: 70, image: '/ingredients/pepperoni.png' },
  { id: 'mushrooms', name: 'Грибы', price: 40, image: '/ingredients/mushrooms.png' },
  { id: 'olives', name: 'Оливки', price: 30, image: '/ingredients/olives.png' },
  { id: 'onions', name: 'Лук', price: 20, image: '/ingredients/onions.png' },
  { id: 'peppers', name: 'Перец', price: 25, image: '/ingredients/peppers.png' }
]

export const PIZZAS: Pizza[] = [
  {
    id: 'margherita',
    name: 'Маргарита',
    description: 'Классическая пицца с томатным соусом, моцареллой и базиликом',
    image: '/pizzas/margherita.jpg',
    basePrice: 300
  },
  {
    id: 'pepperoni',
    name: 'Пепперони',
    description: 'Пицца с пикантной пепперони, сыром и томатным соусом',
    image: '/pizzas/pepperoni.jpg',
    basePrice: 350
  },
  {
    id: 'four-cheese',
    name: 'Четыре сыра',
    description: 'Сочетание четырех видов сыра: моцарелла, пармезан, горгонзола и рикотта',
    image: '/pizzas/four-cheese.jpg',
    basePrice: 400
  },
  {
    id: 'vegetarian',
    name: 'Вегетарианская',
    description: 'Пицца с овощами: грибы, перец, лук, оливки и томаты',
    image: '/pizzas/vegetarian.jpg',
    basePrice: 320
  }
]

export const ORDER_STATUSES = [
  { id: 'accepted', name: 'Принят', description: 'Ваш заказ принят и обрабатывается' },
  { id: 'preparing', name: 'Готовится', description: 'Пицца готовится в печи' },
  { id: 'on-the-way', name: 'В пути', description: 'Курьер уже в пути' },
  { id: 'delivered', name: 'Доставлен', description: 'Заказ доставлен! Приятного аппетита!' }
] as const
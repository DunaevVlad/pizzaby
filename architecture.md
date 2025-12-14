## Архитектурные требования

### 1. Общая архитектура проекта

Курсовая работа реализуется в виде монорепозитория и содержит несколько проектов:

- **Основное приложение** — клиентское SPA для заказа пиццы  
- **Библиотека UI-компонентов** — набор переиспользуемых визуальных компонентов  
- **Общий модуль** — утилиты и вспомогательные функции  

Архитектура — одностраничное приложение (SPA) на React.

---

### 2. Структура проектов

#### 2.1 Основное приложение (`apps/web-app`)

apps/web-app/
├── src/
│ ├── app/
│ │ ├── App.jsx
│ │ ├── router.jsx
│ │ └── providers.jsx
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ ├── CartPage.jsx
│ │ ├── CheckoutPage.jsx
│ │ └── OrderStatusPage.jsx
│ ├── widgets/
│ │ ├── Header.jsx
│ │ ├── PizzaCatalog.jsx
│ │ ├── Cart.jsx
│ │ └── OrderTracker.jsx
│ ├── features/
│ │ ├── pizza-constructor/
│ │ ├── cart/
│ │ └── checkout/
│ ├── entities/
│ │ └── pizza/
│ ├── shared/
│ │ └── hooks/
│ ├── index.jsx
│ └── styles/
│ └── tailwind.css
├── public/
└── vite.config.js

Назначение:
- `pages` — страницы приложения
- `widgets` — крупные UI-блоки
- `features` — бизнес-логика
- `entities` — модели предметной области
- `shared` — общие хуки и вспомогательные элементы

---

#### 2.2 Библиотека UI-компонентов (`packages/ui-kit`)

packages/ui-kit/
├── src/
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── Input.jsx
│ │ ├── Select.jsx
│ │ ├── Card.jsx
│ │ └── Notification.jsx
│ ├── index.js
│ └── styles/
└── package.json

Назначение:
- Переиспользуемые визуальные компоненты интерфейса

---

#### 2.3 Общие утилиты (`packages/shared`)

packages/shared/
├── src/
│ ├── storage/
│ │ └── localStorageService.js
│ ├── constants/
│ ├── utils/
│ └── index.js

Назначение:
- Работа с `localStorage`
- Общие функции и константы

---

### 3. Используемые библиотеки

| Библиотека | Версия | Назначение |
|-----------|--------|-----------|
| react | ^18.x | Построение UI |
| react-dom | ^18.x | Рендеринг |
| react-router-dom | ^6.x | Роутинг |
| redux / react-context | ^8.x / встроенный | Управление состоянием |
| tailwindcss | ^3.x | Стилизация |
| vite | ^5.x | Сборка |
| eslint | ^8.x | Линтинг |
| prettier | ^3.x | Форматирование |

---

### 4. Разрабатываемые компоненты

#### Основное приложение
- `Header` — шапка сайта  
- `PizzaCatalog` — каталог пицц  
- `PizzaCard` — карточка пиццы  
- `Cart` — корзина  
- `PizzaConstructor` — настройка пиццы  
- `CheckoutForm` — оформление заказа  
- `OrderTracker` — отслеживание заказа  

#### UI-библиотека
- `Button` — кнопки  
- `Input` — поля ввода  
- `Select` — выпадающие списки  
- `Modal` — модальные окна  
- `Notification` — уведомления  
- `Card` — карточки  

---

### 5. Роутинг и страницы

| Путь | Страница | Назначение |
|----|---------|-----------|
| `/` | Главная | Каталог пицц |
| `/cart` | Корзина | Управление заказом |
| `/checkout` | Оформление | Ввод данных |
| `/order/:id` | Статус заказа | Отслеживание |
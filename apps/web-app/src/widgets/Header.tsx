import { Link } from 'react-router-dom'
import { useApp } from '../app/providers'

const Header: React.FC = () => {
  const { state } = useApp()
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.configuration.quantity, 0)

  return (
    <header style={{ backgroundColor: '#fed7aa', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/#hero" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#9a3412', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
          🍕 PizzaBy
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to="/#catalog"
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '2px solid black', backgroundColor: 'white', textDecoration: 'none', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}
          >
            Каталог
          </Link>

          <Link
            to="/cart"
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '2px solid black', backgroundColor: 'white', textDecoration: 'none', fontWeight: '500', position: 'relative', fontFamily: 'Inter, sans-serif' }}
          >
            Корзина
            {cartItemsCount > 0 && (
              <span style={{ position: 'absolute', top: '-12px', right: '-12px', backgroundColor: '#ef4444', color: 'white', fontSize: '0.875rem', borderRadius: '50%', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '2px solid white' }}>
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
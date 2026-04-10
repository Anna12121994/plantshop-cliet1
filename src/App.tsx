import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductsList from './components/ProductsList'
import AdminPanel from './components/AdminPanel'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import CartPanel from './components/CartPanel'
import MyOrders from './components/MyOrders'
import AdminOrders from './components/AdminOrders'
import Notification from './components/Notification'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [cartRefreshKey, setCartRefreshKey] = useState(0)
  const [ordersRefreshKey, setOrdersRefreshKey] = useState(0)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text)
    setMessageType(type)

    setTimeout(() => {
      setMessage('')
    }, 2500)
  }

  const checkAdminRole = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsAdmin(false)
      setIsLoggedIn(false)
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const role =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      setIsAdmin(role === 'Admin')
      setIsLoggedIn(true)
    } catch {
      setIsAdmin(false)
      setIsLoggedIn(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAdmin(false)
    setIsLoggedIn(false)
    setIsCartOpen(false)
    showMessage('Ви вийшли з акаунта', 'success')
  }

  const handleProductChanged = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleCartChanged = () => {
    setCartRefreshKey(prev => prev + 1)
  }

  const handleOrdersChanged = () => {
    setOrdersRefreshKey(prev => prev + 1)
    setCartRefreshKey(prev => prev + 1)
  }

  const handleCartToggle = () => {
    if (!isLoggedIn) {
      showMessage('Щоб користуватися кошиком, потрібно увійти', 'error')
      return
    }

  }

  useEffect(() => {
    checkAdminRole()
  }, [])

  return (
    <div>
      <Notification
        message={message}
        type={messageType}
        onClose={() => setMessage('')}
      />

      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={checkAdminRole}
        showMessage={showMessage}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        showMessage={showMessage}
      />

      <ProductsList
        refreshKey={refreshKey}
        isLoggedIn={isLoggedIn}
        onCartChanged={handleCartChanged}
        onCartClick={handleCartToggle}
        showMessage={showMessage}
      />

      <CartPanel
        isLoggedIn={isLoggedIn}
        refreshKey={cartRefreshKey}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onPaid={handleOrdersChanged}
        showMessage={showMessage}
      />

      <MyOrders isLoggedIn={isLoggedIn} refreshKey={ordersRefreshKey} />

      {isAdmin && (
        <details className="admin-wrapper" open>
          <summary>Адмін-панель</summary>
          <AdminPanel
            onProductAdded={handleProductChanged}
            showMessage={showMessage}
          />
          <AdminOrders isAdmin={isAdmin} showMessage={showMessage} />
        </details>
      )}
    </div>
  )
}

export default App
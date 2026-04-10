import { useEffect, useState } from 'react'

type CartItem = {
  id: number
  quantity: number
  price: number
  product: {
    name: string
  }
}

type Cart = {
  id: number
  status: string
  items: CartItem[]
}

type Props = {
  isLoggedIn: boolean
  refreshKey: number
  isOpen: boolean
  onClose: () => void
  onPaid: () => void
  showMessage: (text: string, type: 'success' | 'error') => void
}

function CartPanel({
  isLoggedIn,
  refreshKey,
  isOpen,
  onClose,
  onPaid,
  showMessage
}: Props) {
  const [cart, setCart] = useState<Cart | null>(null)

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token ? token.replace(/^"|"$/g, '') : null
  }

  const loadCart = async () => {
    const token = getToken()
    if (!token) return

    const response = await fetch('https://localhost:7016/api/orders/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) return

    const data = await response.json()
    setCart(data)
  }

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      loadCart()
    }
  }, [isLoggedIn, refreshKey, isOpen])

  const handleRemoveItem = async (itemId: number) => {
    const token = getToken()
    if (!token) return

    const response = await fetch(`https://localhost:7016/api/orders/cart/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      showMessage('Товар видалено з кошика', 'success')
      loadCart()
    } else {
      showMessage('Не вдалося видалити товар', 'error')
    }
  }

  const handlePay = async () => {
    const token = getToken()
    if (!token) return

    const response = await fetch('https://anna0604-001-site1.ktempurl.com/api/orders/cart/pay', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      onPaid()
      onClose()
      showMessage('Замовлення оплачено', 'success')
    } else {
      showMessage('Не вдалося оплатити', 'error')
    }
  }

  if (!isLoggedIn || !isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-window cart-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Кошик</h2>

        {!cart || cart.items.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <>
            {cart.items.map(item => (
              <div key={item.id} className="cart-row">
                <span>{item.product.name}</span>
                <span>{item.quantity} шт.</span>
                <span>{item.price} грн</span>
                <button
                  className="remove-cart-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Видалити
                </button>
              </div>
            ))}

            <button className="pay-btn" onClick={handlePay}>
              Оплатити
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPanel
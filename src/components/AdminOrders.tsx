import { useEffect, useState } from 'react'

type OrderItem = {
  id: number
  quantity: number
  price: number
  product: {
    name: string
  }
}

type Order = {
  id: number
  status: string
  createdAt: string
  user: {
    userName: string
    email: string
  }
  items: OrderItem[]
}

type Props = {
  isAdmin: boolean
  showMessage: (text: string, type: 'success' | 'error') => void
}

function AdminOrders({ isAdmin }: Props) {
  const [orders, setOrders] = useState<Order[]>([])

  const loadOrders = async () => {
    const token = localStorage.getItem('token')

    if (!token) return

    const response = await fetch('http://anna0604-001-site1.ktempurl.com/api/orders/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      console.log('Не вдалося завантажити замовлення для адміна')
      return
    }

    const data = await response.json()
    setOrders(data)
  }

  useEffect(() => {
    if (isAdmin) {
      loadOrders()
    } else {
      setOrders([])
    }
  }, [isAdmin])

  const handleDeliver = async (orderId: number) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://anna0604-001-site1.ktempurl.com/api/orders/${orderId}/deliver`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      alert('Статус змінено на Доставлено')
      loadOrders()
    } else {
      alert('Не вдалося змінити статус')
    }
  }

  if (!isAdmin) return null

  return (
    <div className="admin-orders-panel">
      <h2>Замовлення користувачів</h2>

      {orders.length === 0 ? (
        <p>Замовлень поки немає</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span><b>Замовлення #{order.id}</b></span>
                <span>{order.status}</span>
              </div>

              <div className="admin-order-user">
                <p><b>Користувач:</b> {order.user.userName}</p>
                <p><b>Email:</b> {order.user.email}</p>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.product.name}</span>
                    <span>{item.quantity} шт.</span>
                    <span>{item.price} грн</span>
                  </div>
                ))}
              </div>

              {order.status === 'Paid' && (
                <button className="deliver-btn" onClick={() => handleDeliver(order.id)}>
                  Доставлено
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
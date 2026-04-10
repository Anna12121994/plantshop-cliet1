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
  items: OrderItem[]
}

type Props = {
  isLoggedIn: boolean
  refreshKey: number
}

function MyOrders({ isLoggedIn, refreshKey }: Props) {
  const [orders, setOrders] = useState<Order[]>([])

  const loadOrders = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch('https://localhost:7016/api/orders/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) return

    const data = await response.json()
    setOrders(data)
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadOrders()
    } else {
      setOrders([])
    }
  }, [isLoggedIn, refreshKey])

  const getStatusText = (status: string) => {
    if (status === 'Paid') return 'Оплачено'
    if (status === 'Delivered') return 'Виконано'
    return status
  }

  if (!isLoggedIn) return null

  return (
    <div className="orders-panel">
      <h2>Мої замовлення</h2>

      {orders.length === 0 ? (
        <p>У вас ще немає замовлень</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span><b>Замовлення #{order.id}</b></span>
                <span className="order-status">{getStatusText(order.status)}</span>
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
import { useEffect, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  lightLevel: string
  careLevel: string
  description: string
  imageUrl: string
}

type User = {
  id: number
  userName: string
  email: string
  role: string
}

type Props = {
  onProductAdded: () => void
  showMessage: (text: string, type: 'success' | 'error') => void
}

function AdminPanel({ onProductAdded, showMessage }: Props) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [lightLevel, setLightLevel] = useState('')
  const [careLevel, setCareLevel] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const token = localStorage.getItem('token')

 const loadProducts = async () => {
  const response = await fetch('https://localhost:7016/api/products?page=1&pageSize=100')
  const data = await response.json()
  setProducts(data.items)
}

  const loadUsers = async () => {
    const response = await fetch('https://localhost:7016/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) return

    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    loadProducts()
    loadUsers()
  }, [])

  const clearForm = () => {
    setName('')
    setCategory('')
    setPrice('')
    setQuantity('')
    setLightLevel('')
    setCareLevel('')
    setDescription('')
    setImageUrl('')
    setEditingId(null)
  }

  const handleSaveProduct = async () => {
    const productData = {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      lightLevel,
      careLevel,
      description,
      imageUrl
    }

    let response

    if (editingId === null) {
      response = await fetch('https://anna0604-001-site1.ktempurl.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })
    } else {
      response = await fetch(`https://anna0604-001-site1.ktempurl.com/api/products/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })
    }

    if (response.ok) {
      showMessage(editingId === null ? 'Товар додано' : 'Товар оновлено', 'success')
      clearForm()
      loadProducts()
      onProductAdded()
    } else {
      showMessage('Помилка збереження товару', 'error')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const response = await fetch(`https://anna0604-001-site1.ktempurl.com/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      showMessage('Товар видалено', 'success')
      loadProducts()
      onProductAdded()
    } else {
      showMessage('Не вдалося видалити товар', 'error')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id)
    setName(product.name)
    setCategory(product.category)
    setPrice(product.price.toString())
    setQuantity(product.quantity.toString())
    setLightLevel(product.lightLevel)
    setCareLevel(product.careLevel)
    setDescription(product.description)
    setImageUrl(product.imageUrl)
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-form">
        <input placeholder="Назва" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Категорія" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input placeholder="Ціна" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Кількість" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Освітлення" value={lightLevel} onChange={(e) => setLightLevel(e.target.value)} />
        <input placeholder="Догляд" value={careLevel} onChange={(e) => setCareLevel(e.target.value)} />
        <input placeholder="URL картинки" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea placeholder="Опис" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="admin-actions">
          <button onClick={handleSaveProduct}>
            {editingId === null ? 'Додати товар' : 'Зберегти зміни'}
          </button>

          {editingId !== null && (
            <button className="cancel-btn" onClick={clearForm}>
              Скасувати
            </button>
          )}
        </div>
      </div>

      <div className="admin-section">
        <h3>Усі товари</h3>
        <div className="admin-products-list">
          {products.map((product) => (
            <div key={product.id} className="admin-product-row">
              <span>{product.name}</span>
              <div className="admin-row-buttons">
                <button className="edit-btn" onClick={() => handleEditProduct(product)}>Редагувати</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Видалити</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h3>Зареєстровані користувачі</h3>
        <div className="admin-users-list">
          {users.map((user) => (
            <div key={user.id} className="admin-user-row">
              <span>{user.userName}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
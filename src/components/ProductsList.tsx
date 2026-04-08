import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import Toolbar from './Toolbar'
import Pagination from './Pagination'

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

type ProductsResponse = {
  totalItems: number
  page: number
  pageSize: number
  items: Product[]
}

type Props = {
  refreshKey: number
  isLoggedIn: boolean
  onCartChanged: () => void
  onCartClick: () => void
  showMessage: (text: string, type: 'success' | 'error') => void
}

function ProductsList({
  refreshKey,
  isLoggedIn,
  onCartChanged,
  onCartClick,
  showMessage
}: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token ? token.replace(/^"|"$/g, '') : null
  }

  useEffect(() => {
    fetch(`https://localhost:7016/api/products?search=${search}&category=${category}&sortBy=${sortBy}&page=${page}&pageSize=6`)
      .then(res => res.json())
      .then((data: ProductsResponse) => {
        setProducts(data.items)
        setTotalPages(Math.ceil(data.totalItems / data.pageSize))
      })
      .catch(() => showMessage('Не вдалося завантажити товари', 'error'))
  }, [search, category, sortBy, page, refreshKey])

  const handleAddToCart = async (productId: number) => {
    const token = getToken()

    if (!token) {
      showMessage('Спочатку увійдіть у систему', 'error')
      return
    }

    const response = await fetch('https://localhost:7016/api/orders/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity: 1
      })
    })

    if (response.ok) {
      showMessage('Товар додано в кошик', 'success')
      onCartChanged()
    } else {
      showMessage('Не вдалося додати в кошик', 'error')
    }
  }

  return (
    <>
      <Toolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCartClick={onCartClick}
      />

      <div className="products">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isLoggedIn={isLoggedIn}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  )
}

export default ProductsList
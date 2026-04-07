import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

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

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:7016/api/products')
      .then(res => res.json())
      .then((data: ProductsResponse) => {
        setProducts(data.items)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="products">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export default ProductsList
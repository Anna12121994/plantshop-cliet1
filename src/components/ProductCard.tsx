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

type Props = {
  product: Product
}

function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p><b>Категорія:</b> {product.category}</p>
      <p><b>Ціна:</b> {product.price} грн</p>
      <p>{product.description}</p>
    </div>
  )
}

export default ProductCard
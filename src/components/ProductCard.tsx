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
  isLoggedIn: boolean
  onAddToCart: (productId: number) => void
}

function ProductCard({ product, isLoggedIn, onAddToCart }: Props) {
  return (
    <div className="card">
      <img
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x220?text=No+Image'
        }}
      />
      <h3>{product.name}</h3>
      <p><b>Категорія:</b> {product.category}</p>
      <p><b>Ціна:</b> {product.price} грн</p>
      <p><b>Світло:</b> {product.lightLevel}</p>
      <p><b>Догляд:</b> {product.careLevel}</p>
      <p>{product.description}</p>

      {isLoggedIn && (
        <button className="buy-btn" onClick={() => onAddToCart(product.id)}>
          Додати в кошик
        </button>
      )}
    </div>
  )
}

export default ProductCard